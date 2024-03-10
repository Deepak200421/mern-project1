// controllers/taskController.js

const Task = require('../models/task');

// Function to create a new task
exports.createTask = async (req, res) => {
  try {
    const { taskName, taskDescription, taskCategory } = req.body;
    const task = await Task.create({ taskName, taskDescription, taskCategory });
    res.status(201).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to fetch all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to delete tasks by taskCategory
exports.deleteTaskByName = async (req, res) => {
  try {
    const taskName = req.params.taskName;
    await Task.deleteOne({ taskName });
    res.json({ success: true, message: `Task "${taskName}" deleted successfully` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { taskName } = req.params; // Assuming task name is unique
    const { newTaskName, taskDescription, taskCategory } = req.body;
    const updatedTask = await Task.findOneAndUpdate(
      { taskName },
      { taskName: newTaskName, taskDescription, taskCategory },
      { new: true }
    );
    res.json({ success: true, updatedTask });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
