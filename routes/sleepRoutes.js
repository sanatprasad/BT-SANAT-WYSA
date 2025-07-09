const express = require('express');
const router = express.Router();
const { addSleepEntry, getSleepHistory } = require('../controllers/sleepController');
const verifyJWT = require('../middlewares/verifyJWT');

router.post('/submit', verifyJWT, addSleepEntry);
router.get('/history', verifyJWT, getSleepHistory);

module.exports = router;
