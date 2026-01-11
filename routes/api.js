// routes/api.js
const express = require('express');
const router = express.Router();

// Import Controller
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

// --- Routes Auth ---
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/login-key', authController.loginByKey);

// --- Routes User ---
router.get('/users', userController.getAllUsers);
router.delete('/users/:username', userController.deleteUser);

module.exports = router;