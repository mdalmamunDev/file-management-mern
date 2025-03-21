
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";


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
