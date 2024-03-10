// bcrypt.js

const bcrypt = require('bcrypt');

// Function to hash a password
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

// Function to compare a plain password with a hashed password
const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword); // Compare the passwords
    return isMatch;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

module.exports = { hashPassword, comparePassword };
