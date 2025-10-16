const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { protect } = require('../middleware/auth');
const Booking = require('../models/Booking');
const { createMeetingEvent, deleteMeetingEvent } = require('../utils/googleCalendar');
const { sendBookingConfirmation, sendCounselorNotification } = require('../utils/emailService');

// @route   POST /api/booking/create
// @desc    Create a new booking
// @access  Private
router.post('/create', [
  protect,
  body('sessionDate').notEmpty().withMessage('Session date is required'),
  body('sessionTime').notEmpty().withMessage('Session time is required'),
  body('topic').notEmpty().withMessage('Topic is required'),
  body('counselorEmail').isEmail().withMessage('Valid counselor email is required')
], async (req, res) => {
  try {
    const { sessionDate, sessionTime, topic, description, duration, counselorEmail } = req.body;

    // Create booking details for calendar event
    const bookingDetails = {
      date: sessionDate,
      time: sessionTime,
      duration: duration || 60,
      topic,
      description,
      userEmail: req.user.email,
      counselorEmail,
      userName: req.user.name
    };

    // Create Google Calendar event
    let meetingData = {};
    try {
      meetingData = await createMeetingEvent(bookingDetails);
    } catch (calendarError) {
      console.error('Calendar error:', calendarError);
      // Continue without calendar event if it fails
    }

    // Create booking in database
    const booking = await Booking.create({
      user: req.user._id,
      counselorEmail,
      sessionDate,
      sessionTime,
      duration: duration || 60,
      topic,
      description,
      meetingLink: meetingData.meetingLink,
      googleEventId: meetingData.eventId,
      status: 'confirmed'
    });

    // Send confirmation emails
    try {
      await sendBookingConfirmation(req.user.email, req.user.name, {
        date: sessionDate,
        time: sessionTime,
        duration: duration || 60,
        topic,
        meetingLink: meetingData.meetingLink
      });

      await sendCounselorNotification(counselorEmail, {
        userName: req.user.name,
        userEmail: req.user.email,
        date: sessionDate,
        time: sessionTime,
        topic,
        description,
        meetingLink: meetingData.meetingLink
      });
    } catch (emailError) {
      console.error('Email error:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking. Please try again.'
    });
  }
});

// @route   GET /api/booking/:id
// @desc    Get booking details
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('user', 'name email phone');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns this booking
    if (booking.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this booking'
      });
    }

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve booking'
    });
  }
});

// @route   PUT /api/booking/:id/cancel
// @desc    Cancel a booking
// @access  Private
router.put('/:id/cancel', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns this booking
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }

    // Delete Google Calendar event if exists
    if (booking.googleEventId) {
      try {
        await deleteMeetingEvent(booking.googleEventId);
      } catch (calendarError) {
        console.error('Calendar deletion error:', calendarError);
      }
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      booking
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking'
    });
  }
});

// @route   GET /api/booking/available-slots
// @desc    Get available time slots
// @access  Public
router.get('/slots/available', async (req, res) => {
  try {
    const { date } = req.query;

    // This is a simplified version - you can enhance this based on your needs
    const availableSlots = [
      '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'
    ];

    // Get existing bookings for the date
    if (date) {
      const existingBookings = await Booking.find({
        sessionDate: new Date(date),
        status: { $in: ['pending', 'confirmed'] }
      }).select('sessionTime');

      const bookedTimes = existingBookings.map(b => b.sessionTime);
      const available = availableSlots.filter(slot => !bookedTimes.includes(slot));

      return res.json({
        success: true,
        slots: available
      });
    }

    res.json({
      success: true,
      slots: availableSlots
    });
  } catch (error) {
    console.error('Get available slots error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve available slots'
    });
  }
});

module.exports = router;
