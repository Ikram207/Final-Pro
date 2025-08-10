// backend/controllers/taskController.js
const Task = require('../models/Task');

// Récupérer toutes les tâches de l'utilisateur (par exemple)
const getTasks = async (req, res) => {
  try {
    // Si tu gères les tâches par utilisateur (req.user.id), tu peux filtrer ici
    const tasks = await Task.find(/*{ user: req.user.id }*/);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle tâche
const createTask = async (req, res) => {
  try {
    // Si tu veux associer la tâche à l'utilisateur : req.body.user = req.user.id
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour une tâche
const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) return res.status(404).json({ message: "Tâche non trouvée" });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer une tâche
const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: "Tâche non trouvée" });
    res.json({ message: "Tâche supprimée" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
