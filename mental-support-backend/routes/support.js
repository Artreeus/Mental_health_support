const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { protect } = require('../middleware/auth');
const SupportRequest = require('../models/SupportRequest');
const { sendSupportRequestConfirmation } = require('../utils/emailService');

// @route   POST /api/support/request
// @desc    Submit a support request
// @access  Public
router.post('/request', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().notEmpty().withMessage('Message is required')
], async (req, res) => {
  try {
    const { name, email, phone, subject, message, urgency } = req.body;

    // Create support request
    const supportRequest = await SupportRequest.create({
      name,
      email,
      phone,
      subject,
      message,
      urgency: urgency || 'medium',
      user: req.user ? req.user._id : null
    });

    // Send confirmation email
    try {
      await sendSupportRequestConfirmation(email, name, subject);
    } catch (emailError) {
      console.error('Email error:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Your request has been submitted. We will get back to you soon.',
      supportRequest: {
        id: supportRequest._id,
        subject: supportRequest.subject,
        status: supportRequest.status
      }
    });
  } catch (error) {
    console.error('Support request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit request. Please try again.'
    });
  }
});

// @route   GET /api/support/my-requests
// @desc    Get user's support requests
// @access  Private
router.get('/my-requests', protect, async (req, res) => {
  try {
    const requests = await SupportRequest.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: requests.length,
      requests
    });
  } catch (error) {
    console.error('Get support requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve support requests'
    });
  }
});

// @route   GET /api/support/request/:id
// @desc    Get specific support request
// @access  Private
router.get('/request/:id', protect, async (req, res) => {
  try {
    const request = await SupportRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Support request not found'
      });
    }

    // Check if user owns this request
    if (request.user && request.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this request'
      });
    }

    res.json({
      success: true,
      request
    });
  } catch (error) {
    console.error('Get support request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve support request'
    });
  }
});

module.exports = router;
