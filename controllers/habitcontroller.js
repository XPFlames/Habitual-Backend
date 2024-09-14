// controllers/habitController.js
const Habit = require('../models/Habit');

// Create habit
exports.createHabit = async (req, res) => {
  const { name, category, goal, streakGoal } = req.body;

  try {
    const habit = new Habit({
      user: req.user._id,
      name,
      category,
      goal,
      streakGoal,
    });

    await habit.save();
    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user habits
exports.getUserHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user._id });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update habit progress
exports.updateHabitProgress = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    if (habit.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    habit.progress = req.body.progress;
    habit.streak = req.body.streak;
    habit.completed = req.body.completed;

    await habit.save();
    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete habit
exports.deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    if (habit.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await habit.remove();
    res.json({ message: 'Habit removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
