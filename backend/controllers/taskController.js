const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');

// Create task
const createTask = asyncHandler(async (req, res) => {
  const { title, status, dueDate, description } = req.body;
  if (!title) {
    res.status(400);
    throw new Error('Title is required');
  }
  const task = new Task({ user: req.user._id, title, status, dueDate, description });
  const createdTask = await task.save();
  res.status(201).json(createdTask);
});

// Get tasks for logged user
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(tasks);
});

// Update task
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) { res.status(404); throw new Error('Task not found'); }
  if (task.user.toString() !== req.user._id.toString()) { res.status(401); throw new Error('Not authorized'); }

  const { title, status, dueDate, description } = req.body;
  task.title = title ?? task.title;
  task.status = status ?? task.status;
  task.dueDate = dueDate ?? task.dueDate;
  task.description = description ?? task.description;

  const updatedTask = await task.save();
  res.json(updatedTask);
});

// Delete task
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) { res.status(404); throw new Error('Task not found'); }
  if (task.user.toString() !== req.user._id.toString()) { res.status(401); throw new Error('Not authorized'); }

  await task.remove();
  res.json({ message: 'Task removed' });
});

module.exports = { createTask, getTasks, updateTask, deleteTask };
