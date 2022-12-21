const express = require('express');
const { loginController } = require('../controllers');
const validateToken = require('../middlewares/token.validate');

const router = express.Router();

router.post('/', validateToken, loginController.login);

module.exports = router;