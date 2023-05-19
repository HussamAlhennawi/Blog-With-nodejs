const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const guest = require('../middlewares/guestMiddleware')
const auth = require('../middlewares/authMiddleware')



router.get('/signup', guest, authController.signupForm)
      .post('/signup', guest, authController.signup)
      .get('/login', guest, authController.loginForm)
      .post('/login', guest, authController.login)

router.post('/logout', auth, authController.logout)

module.exports = router
