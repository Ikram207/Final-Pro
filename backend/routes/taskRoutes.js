// const express = require('express');
// const router = express.Router();
// const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
// const { protect } = require('../middleware/authMiddleware');

// router.route('/')
//   .get(protect, getTasks)
//   .post(protect, createTask);

// router.route('/:id')
//   .put(protect, updateTask)
//   .delete(protect, deleteTask);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createTask, getTasks, deleteTask } = require('../controllers/taskController');

// 📌 Ajouter une nouvelle tâche
router.post('/', protect, createTask);

// 📌 Récupérer les tâches de l'utilisateur
router.get('/', protect, getTasks);

// 📌 Supprimer une tâche
router.delete('/:id', protect, deleteTask);

module.exports = router;
