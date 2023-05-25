const express = require ("express");

const AuthController = require ('../controller/auth');

const router = express.Router();


//POST - Register
router.post('/register', AuthController.createUserRegister);

//POST - Login
router.post('/login', AuthController.loginUser);

module.exports = router;