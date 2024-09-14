// routes/habitRoutes.js
const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createHabit,
  getUserHabits,
  updateHabitProgress,
  deleteHabit,
} = require('../controllers/habitController');

const router = express.Router();

router.route('/')
  .post(protect, createHabit)
  .get(protect, getUserHabits);

router.route('/:id')
  .put(protect, updateHabitProgress)
  .delete(protect, deleteHabit);

module.exports = router;
