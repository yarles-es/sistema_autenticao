const express = require('express');
const { userController } = require('../controllers');
const { validateUser } = require('../middlewares/user.validate.joi');
const { validateUserExists } =require('../middlewares/user.validate');

const router = express.Router();

router.post('/', validateUser, validateUserExists, userController.createUser);

module.exports = router;