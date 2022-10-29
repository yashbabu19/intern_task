const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const userRouter = require('./Routers/userRouter');
//app.use(express.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use('/api/user', userRouter);

module.exports = app