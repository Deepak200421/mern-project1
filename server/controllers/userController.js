// controllers/userController.js

const User = require('../models/User');

// Controller function to register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, password, email, firstName, lastName } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    // Create a new user
    const newUser = new User({
      username,
      password, // Store plain password
      email,
      firstName,
      lastName,
    });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to login a user
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ status: "user logged in" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
