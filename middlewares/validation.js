const express = require('express');
const bodyParser = require('body-parser');

const app=express();
// Parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const validateUserInput = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }
  if (password.length < 8 || !/(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long and contain at least one letter and one number.' });
  }
  next();
};

module.exports = { validateUserInput };
