const express = require("express")
const bodyParser = require('body-parser');
const axios = require("axios");
const PIPELINE_ENDPOINT = process.env.PIPELINE_ENDPOINT;
const builderRouter = express.Router();

builderRouter.use(bodyParser.json());


builderRouter.post('/', async (request, response) => {
    const res = await axios.post(PIPELINE_ENDPOINT);
    console.log(res);
    response.status(200);
    response.end();
});

module.exports = builderRouter;