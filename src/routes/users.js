const express = require('express');

const router = express.Router({mergeParams: true});
const userController = require('../controllers/users');
const authController = require('../controllers/auth');
const locationController = require('../controllers/locations');
const routeController = require('../controllers/routes');
const alertController = require('../controllers/alerts')

// General User Routes
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers)
router.get('/:userId', authController.userAuthenticated, authController.isSelf, userController.getUser);
router.delete('/:userId', authController.userAuthenticated, authController.isSelf, userController.deleteUser);
router.put('/:userId', authController.userAuthenticated, authController.isSelf, userController.updateUser)

//User Location Routes
router.post('/:userId/locations', authController.userAuthenticated, authController.isSelf, locationController.createLocations)
router.get('/:userId/locations', authController.userAuthenticated, authController.isSelf, locationController.getUserLocations);
router.get('/:userId/locations/:locId', authController.userAuthenticated, authController.isSelf, locationController.getUserLocation);
router.delete('/:userId/locations/:locId', authController.userAuthenticated, authController.isSelf, locationController.dropUserLocation);

//User Route Routes
router.get('/:userId/routes', authController.userAuthenticated, authController.isSelf, routeController.getUserRoutes);
router.get('/:userId/routes/:routeId', authController.userAuthenticated, authController.isSelf, routeController.getUserRoute);
router.post('/:userId/routes', authController.userAuthenticated, authController.isSelf, routeController.createUserRoute);
router.delete('/:userId/routes/:routeId', authController.userAuthenticated, authController.isSelf, routeController.dropUserRoute);

// User Alert Routes
router.get('/:userId/alerts', authController.userAuthenticated, authController.isSelf, alertController.getUserAlerts);
router.post('/:userId/alerts', authController.userAuthenticated, authController.isSelf, alertController.createAlert)

module.exports = router