import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify the token
    const decoded = jwt.verify(token, 'your_jwt_secret');

    // Fetch the user from DB
    const user = await User.findById(decoded.id).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach user to request
    req.user = user;
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
