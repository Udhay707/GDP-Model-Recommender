const chatController = require("../controller/chat.controller")
const express = require("express")
const bodyParser = require('body-parser');

const chatRouter = express.Router();

chatRouter.use(bodyParser.json());

chatRouter.post('/', chatController);

module.exports = chatRouter;
