const express = require('express');
const { userRouter, loginRouter } = require('./routers');

const app = express();

app.use(express.json());

app.use('/user', userRouter);

app.use('/login', loginRouter);

module.exports = app;