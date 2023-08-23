const express = require('express');
const router = express.Router();
const roomBookController = require('../controllers/roomBooking');
const { verifyToken, isAdmin } = require("../Middlewares");

router.post("/bookroom/:roomId", verifyToken, roomBookController.roomBooking);

router.get("/mybookings", verifyToken, roomBookController.myroombookings)

router.get("/allbookings", verifyToken, roomBookController.allroombookings)

router.delete("/deleteBooking/:roomBookingId", verifyToken, roomBookController.deleteBooking);


module.exports = router;