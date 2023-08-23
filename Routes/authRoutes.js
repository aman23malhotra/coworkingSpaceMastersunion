const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const middlewares = require("../Middlewares");

router.post("/signin",authController.signin);

module.exports = router;