const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Send booking confirmation email
exports.sendBookingConfirmation = async (userEmail, userName, bookingDetails) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `Mental Support Team <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: '✅ Your Counseling Session is Confirmed',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #10b981; margin-bottom: 20px;">Hello ${userName}! 👋</h2>
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            We're glad you've taken this important step. Your counseling session has been confirmed.
          </p>
          
          <div style="background-color: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0284c7; margin-top: 0;">Session Details:</h3>
            <p style="margin: 8px 0;"><strong>Date:</strong> ${bookingDetails.date}</p>
            <p style="margin: 8px 0;"><strong>Time:</strong> ${bookingDetails.time}</p>
            <p style="margin: 8px 0;"><strong>Duration:</strong> ${bookingDetails.duration} minutes</p>
            <p style="margin: 8px 0;"><strong>Topic:</strong> ${bookingDetails.topic}</p>
          </div>
          
          ${bookingDetails.meetingLink ? `
            <div style="margin: 20px 0;">
              <a href="${bookingDetails.meetingLink}" 
                 style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Join Google Meet
              </a>
            </div>
          ` : ''}
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            Remember, seeking help is a sign of strength. We're here to support you every step of the way. 💚
          </p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="color: #9ca3af; font-size: 12px;">
            If you need to reschedule or have any questions, please contact us at ${process.env.EMAIL_USER}
          </p>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

// Send counselor notification
exports.sendCounselorNotification = async (counselorEmail, bookingDetails) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `Mental Support Team <${process.env.EMAIL_USER}>`,
    to: counselorEmail,
    subject: '📅 New Counseling Session Booked',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #0284c7;">New Session Booking</h2>
        <p>A new counseling session has been booked.</p>
        
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Client Name:</strong> ${bookingDetails.userName}</p>
          <p><strong>Client Email:</strong> ${bookingDetails.userEmail}</p>
          <p><strong>Date:</strong> ${bookingDetails.date}</p>
          <p><strong>Time:</strong> ${bookingDetails.time}</p>
          <p><strong>Topic:</strong> ${bookingDetails.topic}</p>
          ${bookingDetails.description ? `<p><strong>Description:</strong> ${bookingDetails.description}</p>` : ''}
        </div>
        
        ${bookingDetails.meetingLink ? `
          <p><strong>Meeting Link:</strong> <a href="${bookingDetails.meetingLink}">${bookingDetails.meetingLink}</a></p>
        ` : ''}
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

// Send support request confirmation
exports.sendSupportRequestConfirmation = async (userEmail, userName, subject) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `Mental Support Team <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: 'We Received Your Message',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 10px;">
          <h2 style="color: #10b981;">Thank you for reaching out, ${userName}!</h2>
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            We've received your message regarding: <strong>${subject}</strong>
          </p>
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Our team will review your request and get back to you within 24 hours. 
            Your well-being is our priority. 💚
          </p>
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            If you're experiencing a crisis, please call your local emergency services or a crisis hotline immediately.
          </p>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

// Send password reset email
exports.sendPasswordResetEmail = async (userEmail, resetToken) => {
  const transporter = createTransporter();
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: `Mental Support Team <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: '🔐 Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #0284c7;">Password Reset Request</h2>
        <p>You requested to reset your password. Click the button below to proceed:</p>
        <div style="margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #0284c7; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p style="color: #6b7280; font-size: 14px;">
          This link will expire in 1 hour. If you didn't request this, please ignore this email.
        </p>
        <p style="color: #9ca3af; font-size: 12px;">
          Link: ${resetUrl}
        </p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};
