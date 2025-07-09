const userModel = require('../models/user');
const SleepEntry = require('../models/SleepEntry');

const addSleepEntry = async (req, res) => {
  const { struggleDuration, sleepTime, wakeTime, hoursOfSleep } = req.body;

  const userId = req.user?._id; 

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: Token missing or invalid' });
  }

  try {
    const userExists = await userModel.findById(userId);
    if (!userExists) {
      return res.status(403).json({ message: 'Forbidden: User not found in database' });
    }

    const newEntry = new SleepEntry({
      userId,
      struggleDuration,
      sleepTime,
      wakeTime,
      hoursOfSleep
    });

    const savedEntry = await newEntry.save();

    console.log("Sleep entry saved:", {
      entryId: savedEntry._id,
      userId: savedEntry.userId,
      struggleDuration: savedEntry.struggleDuration,
      sleepTime: savedEntry.sleepTime,
      wakeTime: savedEntry.wakeTime,
      hoursOfSleep: savedEntry.hoursOfSleep,
      date: savedEntry.createdAt
    });

    res.status(201).json({
      message: 'Sleep entry saved successfully',
      entry: savedEntry
    });
  } catch (error) {
    console.error('Error saving sleep entry:', error);
    res.status(500).json({
      error: 'Failed to save sleep entry',
      details: error.message
    });
  }
};

const getSleepHistory = async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: Token missing or invalid' });
  }

  try {
    const userExists = await userModel.findById(userId);
    if (!userExists) {
      return res.status(403).json({ message: 'Forbidden: User not found in database' });
    }

    const entries = await SleepEntry.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Sleep history fetched successfully',
      entries
    });
  } catch (error) {
    console.error('Error fetching sleep history:', error);
    res.status(500).json({
      error: 'Failed to fetch sleep history',
      details: error.message
    });
  }
};

module.exports = {
  addSleepEntry,
  getSleepHistory
};
