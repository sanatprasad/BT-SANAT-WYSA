// models/SleepEntry.js
const mongoose = require('mongoose');

const sleepEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  struggleDuration: {
    type: String,
    required: true
  },
  sleepTime: {
    type: String,
    required: true
  },
  wakeTime: {
    type: String,
    required: true
  },
  hoursOfSleep: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SleepEntry', sleepEntrySchema);
