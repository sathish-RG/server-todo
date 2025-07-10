const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');

const authController = {
  register: async (req, res) => {
    try {
      const { email, name, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        email,
        password: hashPassword,
        name
      });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User does not exist' }); // Typo fixed
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Incorrect password' });
      }

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' }); // (Optional) expire after 1 day

      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
      });

      res.status(200).json({
        message: 'User login successfully',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          taskList: user.TaskIds
        },
        token,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie('token');
      res.status(200).json({ message: "User logout successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  profile: async (req, res) => {
    try {
      const user = await User.findById(req.userId)
        .select('-password -__v')
        .populate('TaskIds'); // ✅ Populate tasks
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = authController;
