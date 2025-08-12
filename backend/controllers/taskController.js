const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');

const createTask = asyncHandler(async (req, res) => {
  const { title, status, dueDate, description } = req.body;
  const task = new Task({
    user: req.user._id,
    title,
    status,
    dueDate,
    description,
  });

  try {
    const createdTask = await task.save();
    const result = createdTask.toObject();
    // Assure que dueDate est une string ISO ou null
    result.dueDate = result.dueDate ? result.dueDate.toISOString() : null;
    res.status(201).json(result);
  } catch (error) {
    res.status(400);
    throw new Error('Erreur lors de la création de la tâche');
  }
});

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  const results = tasks.map(t => {
    const obj = t.toObject();
    obj.dueDate = obj.dueDate ? obj.dueDate.toISOString() : null;
    return obj;
  });
  res.json(results);
});

const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error('Tâche non trouvée');
  }
  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Non autorisé');
  }

  const { title, status, dueDate, description } = req.body;
  task.title = title ?? task.title;
  task.status = status ?? task.status;
  task.dueDate = dueDate ?? task.dueDate;
  task.description = description ?? task.description;

  try {
    const updatedTask = await task.save();
    const result = updatedTask.toObject();
    result.dueDate = result.dueDate ? result.dueDate.toISOString() : null;
    res.json(result);
  } catch (error) {
    res.status(400);
    throw new Error('Erreur lors de la mise à jour de la tâche');
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error('Tâche non trouvée');
  }
  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Non autorisé');
  }
  try {
    await task.remove();
    res.json({ message: 'Tâche supprimée' });
  } catch (error) {
    res.status(500);
    throw new Error('Erreur lors de la suppression de la tâche');
  }
});

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
