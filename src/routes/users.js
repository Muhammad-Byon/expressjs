const express = require ("express");

const UserController = require ('../controller/users');

const router = express.Router();


//READ - GET
router.get('/', UserController.getAllUsers);

module.exports = router;