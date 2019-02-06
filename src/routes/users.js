const express = require('express');

const router = express.Router({mergeParams: true});
const userController = require('../controllers/users');
const authController = require('../controllers/auth')

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers)
router.get('/:userId', authController.userAuthenticated, authController.isSelf, userController.getUser);
router.delete('/:userId', authController.userAuthenticated, authController.isSelf, userController.deleteUser);

module.exports = router