const express = require('express');

const router = express.Router({mergeParams: true});
const userController = require('../controllers/users');
const authController = require('../controllers/auth')
const locationController = require('../controllers/locations')

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers)
router.get('/:userId', authController.userAuthenticated, authController.isSelf, userController.getUser);
router.delete('/:userId', authController.userAuthenticated, authController.isSelf, userController.deleteUser);

router.get('/:userId/locations', locationController.getUserLocations);
router.post('/:userId/locations', locationController.createLocations)

module.exports = router