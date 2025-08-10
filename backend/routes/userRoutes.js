const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/userController');

// Inscription à POST /api/users
router.post('/register', registerUser);

// Connexion à POST /api/users/login
router.post('/login', authUser);

module.exports = router;
