// const asyncHandler = require('express-async-handler');
// const Task = require('../models/Task');

// // Create task
// const createTask = asyncHandler(async (req, res) => {
//   const { title, status, dueDate, description } = req.body;
//   if (!title) {
//     res.status(400);
//     throw new Error('Title is required');
//   }
//   const task = new Task({ user: req.user._id, title, status, dueDate, description });
//   const createdTask = await task.save();
//   res.status(201).json(createdTask);
// });

// // Get tasks for logged user
// const getTasks = asyncHandler(async (req, res) => {
//   const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
//   res.json(tasks);
// });

// // Update task
// const updateTask = asyncHandler(async (req, res) => {
//   const task = await Task.findById(req.params.id);
//   if (!task) { res.status(404); throw new Error('Task not found'); }
//   if (task.user.toString() !== req.user._id.toString()) { res.status(401); throw new Error('Not authorized'); }

//   const { title, status, dueDate, description } = req.body;
//   task.title = title ?? task.title;
//   task.status = status ?? task.status;
//   task.dueDate = dueDate ?? task.dueDate;
//   task.description = description ?? task.description;

//   const updatedTask = await task.save();
//   res.json(updatedTask);
// });

// // Delete task
// const deleteTask = asyncHandler(async (req, res) => {
//   const task = await Task.findById(req.params.id);
//   if (!task) { res.status(404); throw new Error('Task not found'); }
//   if (task.user.toString() !== req.user._id.toString()) { res.status(401); throw new Error('Not authorized'); }

//   await task.remove();
//   res.json({ message: 'Task removed' });
// });

// module.exports = { createTask, getTasks, updateTask, deleteTask };
const Task = require('../models/taskModel'); // Assure-toi que c'est bien le bon chemin

// Créer une tâche
const createTask = async (req, res) => {
  try {
    const { title, status, dueDate, description } = req.body;
    const task = await Task.create({
      user: req.user._id,
      title,
      status,
      dueDate,
      description,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la tâche', error: error.message });
  }
};

// Récupérer les tâches
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches', error: error.message });
  }
};

// Supprimer une tâche
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id); // <- Cette méthode existe sur le modèle Mongoose
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Non autorisé à supprimer cette tâche' });
    }

    await task.deleteOne();
    res.json({ message: 'Tâche supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la tâche', error: error.message });
  }
};

module.exports = { createTask, getTasks, deleteTask };
