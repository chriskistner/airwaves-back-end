const express = require('express')
const router = express.Router({mergeParams: true})
const authController = require('../controllers/auth')

router.get('/verify', authController.userAuthenticated, authController.getAuthStatus)
router.post('/login', authController.login)

module.exports = router