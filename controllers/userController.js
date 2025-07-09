const userModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const transporter = require('../config/emailconfig');
const mail = require('../middlewares/emailsender');
const time = require('../middlewares/epochTime');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();
const secretkey = process.env.SECRET_KEY;

// Utility: Convert DD/MM/YYYY to UTC timestamp
function convertDateToTimestamp(dateString) {
  const [day, month, year] = dateString.split('/').map(Number);
  return Date.UTC(year, month - 1, day);
}

// ============================== CONTROLLERS ============================== //

const getImageController = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const imagePath = path.join(__dirname, '../public', user.profile);
    const imageBuffer = fs.readFileSync(imagePath);
    res.send({ base64Image: imageBuffer.toString('base64') });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const user = await userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      secretkey,
      { expiresIn: '1h' }
    );
    res.status(200).json({
      success: true,
      name: user.name,
      email: user.email,
      token,
      message: 'Login Successful'
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getcontroller = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid User ID format' });
    const user = await userModel.findById(id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ user });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deletecontroller = async (req, res) => {
  try {
    const result = await userModel.findOneAndDelete({ name: req.params.name });
    if (!result) return res.status(404).json({ message: 'Document not found' });
    res.status(200).json(result);
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updatecontroller = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid User ID' });
    if (req.body._id) delete req.body._id;
    const result = await userModel.updateOne({ _id: id }, { $set: req.body });
    if (result.modifiedCount === 0) return res.status(404).json({ message: 'User not found or no changes made' });
    res.status(200).json({ status: 'updated' });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields are required.' });
    const existingUser = await userModel.findOne({ email });
    if (existingUser) return res.status(409).json({ message: 'Registration failed. Email already exists.' });
    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
    const profileName = req?.file?.filename || null;
    const newUser = new userModel({ name, email, password: hashedPassword, profile: profileName });
    await newUser.save();
    res.status(201).json({ message: 'Register Successfully', success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: `register controller ${error.message}` });
  }
};

const resetController = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ status: 'failed', message: 'Email is required' });
  const user = await userModel.findOne({ email });
  if (!user) return res.status(404).json({ status: 'failed', message: "Email doesn't exist" });
  const secret = user._id + secretkey;
  const token = jwt.sign({ _id: user._id }, secret, { expiresIn: '1h' });
  const link = `http://127.0.0.1:8080/api/v1/user/password-updation/${user._id}/${token}`;
  console.log(link);
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: 'PASSWORD RESET LINK',
    html: `<a href=${link}>Click Here</a> to Reset Your Password`
  });
  res.status(200).json({ status: 'success', message: 'Password Reset Link Sent....' });
};

const changepassword = async (req, res) => {
  try {
    const { email, oldpassword, newpassword } = req.body;
    if (!email || !oldpassword || !newpassword)
      return res.status(400).json({ message: 'Email, and Old and New Passwords are required!' });
    const user = await userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(oldpassword, user.password)))
      return res.status(400).json({ message: 'Invalid credentials.' });
    const hashedPassword = await bcrypt.hash(newpassword, await bcrypt.genSalt(10));
    await userModel.updateOne({ email: user.email }, { $set: { password: hashedPassword } });
    res.status(200).json({ status: 'updated' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const userPasswordReset = async (req, res) => {
  const { password, password_confirmation } = req.body;
  const { id, token } = req.params;
  const user = await userModel.findById(id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const new_secret = user._id + secretkey;
  try {
    jwt.verify(token, new_secret);
    if (password && password_confirmation && password === password_confirmation) {
      const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
      await userModel.updateOne({ _id: user._id }, { $set: { password: hashedPassword } });
      res.status(200).json({ status: 'updated' });
    } else {
      res.status(400).json({ status: 'failed', message: 'All the fields are required or passwords do not match' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: 'failed', message: 'Invalid Token' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const users = await userModel.find({}, '-password').skip(skip).limit(limit);
    const total = await userModel.countDocuments();
    res.status(200).json({
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

module.exports = {
  getImageController,
  userPasswordReset,
  changepassword,
  registerController,
  updatecontroller,
  deletecontroller,
  getcontroller,
  loginController,
  resetController,
  getAllUsers
};
