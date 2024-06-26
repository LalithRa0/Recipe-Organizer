
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/recipe.js');

app.use(bodyParser.json());
app.use('/.netlify/functions/server', routes);

module.exports.handler = serverless(app);
