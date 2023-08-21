const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const middlewares = require("../Middlewares");

router.post("/signin",authController.signin);

// router.get("/signup",adminController.signup);

module.exports = router;