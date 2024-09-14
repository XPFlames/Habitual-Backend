// models/Habit.js
const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  goal: { type: Number, required: true },  // Daily goal in minutes
  streak: { type: Number, default: 0 },
  progress: { type: Number, default: 0 },  // Progress for today
  completed: { type: Boolean, default: false },
  streakGoal: { type: Number, required: true },  // Custom streak goal
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Habit', HabitSchema);
