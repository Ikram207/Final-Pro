const express = require('express');
const router = express.Router();
const {
  createIdea,
  getIdeas,
  updateIdea,
  deleteIdea,
} = require('../controllers/ideaController');
const { protect } = require('../middleware/authMiddleware'); // middleware JWT

router.route('/')
  .get(protect, getIdeas)
  .post(protect, createIdea);

router.route('/:id')
  .put(protect, updateIdea)
  .delete(protect, deleteIdea);

module.exports = router;
