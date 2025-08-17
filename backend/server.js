// // server.js
// require('dotenv').config(); // charge les variables depuis .env
// const express = require('express');
// const connectDB = require('./config/db');
// const cors = require('cors');


// const userRoutes = require('./routes/userRoutes');
// const taskRoutes = require('./routes/taskRoutes');

// const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// // Connexion à MongoDB
// connectDB();

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Route test
// app.get('/', (req, res) => {
//   res.json({ message: 'API backend is working' });
// });

// // Routes API
// app.use('/api/users', userRoutes);
// app.use('/api/tasks', taskRoutes);

// // Gestion des erreurs
// app.use(notFound);
// app.use(errorHandler);

// // Démarrage serveur
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// server.js
// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connexion MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running and MongoDB is connected!");
});

// ===== Exemple CRUD Task =====
const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
});
const Task = mongoose.model("Task", taskSchema);

// GET all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new task
app.post("/tasks", async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update task
app.put("/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE task
app.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Démarrage serveur
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
