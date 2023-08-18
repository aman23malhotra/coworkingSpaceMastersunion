const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');


// User Routes 

router.get("/users",adminController.getAllUsers);

router.get("/user/:userId", adminController.getUser);

router.delete('/deleteUser/:userId', adminController.deleteUser);

router.post('/createUser', adminController.createUser);

router.put('/updateUser/:userId', adminController.updateUser);


// Room Routes

router.get('/rooms', adminController.getAllRoms);

router.get('/availablerooms', adminController.getAllAvailableRooms);

router.get('/room/:roomId', adminController.getRoomDetails);

router.delete('/deleteRoom/:roomId', adminController.deleteRoom);

router.post('/addRoom', adminController.addRoom);

router.put('/updateRoom/:roomId', adminController.updateRoomDetails);


module.exports = router;