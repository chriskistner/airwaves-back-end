const express = require('express');

const router = express.Router({mergeParams: true});
const userController = require('../controllers/users');
const authController = require('../controllers/auth');
const locationController = require('../controllers/locations');
const routeController = require('../controllers/routes');

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers)
router.get('/:userId', authController.userAuthenticated, authController.isSelf, userController.getUser);
router.delete('/:userId', authController.userAuthenticated, authController.isSelf, userController.deleteUser);

router.post('/:userId/locations', authController.userAuthenticated, authController.isSelf, locationController.createLocations)
router.get('/:userId/locations', authController.userAuthenticated, authController.isSelf, locationController.getUserLocations);
router.get('/:userId/locations/:locId', authController.userAuthenticated, authController.isSelf, locationController.getUserLocation);
router.delete('/:userId/locations/:locId', authController.userAuthenticated, authController.isSelf, locationController.dropUserLocation);

router.get('/:userId/routes', routeController.getUserRoutes);
router.post('/:userId/routes', routeController.createUserRoute);
router.delete('/:userId/routes/:routeId', routeController.dropUserRoute);
module.exports = router