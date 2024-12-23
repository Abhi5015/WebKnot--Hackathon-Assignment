const express = require('express');
const { signupUser, signinUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signupUser);
router.post('/signin', signinUser);
router.get('/me', protect, getMe); // Protected Route

module.exports = router;
