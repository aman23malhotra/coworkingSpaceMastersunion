const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const {verifyToken, isAdmin} = require("../Middlewares");


// User Routes 

router.get("/users",verifyToken,isAdmin, adminController.getAllUsers);

router.get("/user/:userId",verifyToken,isAdmin, adminController.getUser);

router.delete('/deleteUser/:userId',verifyToken, isAdmin, adminController.deleteUser);

router.post('/createUser',verifyToken,isAdmin, adminController.createUser);

router.put('/updateUser/:userId', verifyToken, isAdmin, adminController.updateUser);


// Room Routes

router.get('/rooms',verifyToken, adminController.getAllRoms);

router.get('/availablerooms',verifyToken, adminController.getAllAvailableRooms);

router.get('/room/:roomId', verifyToken, adminController.getRoomDetails);

router.delete('/deleteRoom/:roomId', verifyToken, isAdmin, adminController.deleteRoom);

router.post('/addRoom', verifyToken, isAdmin,  adminController.addRoom);

router.put('/updateRoom/:roomId', verifyToken, isAdmin, adminController.updateRoomDetails);


module.exports = router;