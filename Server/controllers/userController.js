import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


//login controller

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (!existing) return res.status(400).json({ message: 'Invalid email or password' });
    const isMatch = await bcrypt.compare(password, existing.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });
    const token = jwt.sign({ id: existing._id },process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({
      message: 'Login successful',
      token, 
      user: { id: existing._id, name: existing.name, email: existing.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};



// user signup controller 
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};
