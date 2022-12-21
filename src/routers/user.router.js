const express = require('express');
const { userController } = require('../controllers');
const { validateUser, validateCpf } = require('../middlewares/user.validate.joi');

const router = express.Router();

router.post('/', validateUser, validateCpf, userController.createUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;