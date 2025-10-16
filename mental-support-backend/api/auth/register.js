// api/auth/register.js - Vercel API route for user registration
import dbConnect from '../../utils/db';
import User from '../../models/User';
import { sendResponse, sendError } from '../../utils/apiResponse';
import { body, validationResult } from 'express-validator';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Validate input
  await body('name').trim().notEmpty().withMessage('Name is required').run(req);
  await body('email').isEmail().withMessage('Please provide a valid email').run(req);
  await body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters').run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendError(res, 400, errors.array()[0].msg);
  }

  const { name, email, password, phone, dateOfBirth } = req.body;

  try {
    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendError(res, 400, 'User already exists with this email');
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      dateOfBirth
    });

    // In a real application, you would generate and return a JWT token
    // For now, we'll return the user data (without password)
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone
    };

    sendResponse(res, 201, true, 'Registration successful', userData);
  } catch (error) {
    console.error('Registration error:', error);
    sendError(res, 500, 'Registration failed. Please try again.');
  }
}