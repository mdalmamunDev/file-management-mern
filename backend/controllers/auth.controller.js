
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";
import Redis from 'ioredis';



const redis = new Redis(); // Connect to Redis


export const register = async (req, res) => {
  const { userName, email, password, passwordConfirm } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  if (password !== passwordConfirm) {
    return res.status(400).json({ message: 'Please confirm your password' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    user_name: userName,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  res.status(201).json({ message: 'User registered successfully' });
}

export const login = async (req, res) => {
  //   res.json({ 'token': 121 });
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
  res.json({ token });
}

export const logout = async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Decode token to get expiration time
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const expiryTime = decoded.exp - Math.floor(Date.now() / 1000);

    // Store token in Redis with expiration
    await redis.set(token, 'blacklisted', 'EX', expiryTime);

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed" });
  }
};


export const profile = async (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await User.findById(decoded.id);
    res.json({ email: user.email });
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

export const dropAccount = async (req, res) => {
  try {
    console.log(req);
    const userId = req.user?.id; // Retrieved from the authenticated token
    if (!userId) {
      return res.status(400).json({ message: 'Something wend wrong' });
    }
    // Find and delete the user by their ID
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'Account successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete account', error: error.message });
  }
};



export const privacyCheck = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ success: false, message: "Password is required" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }
    res.json({ success: true });
  } catch (error) {
    console.error("Privacy check failed:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};