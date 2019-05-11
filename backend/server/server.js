var express = require('express');
var bodyParser = require('body-parser');
var cors= require('cors');
var _ = require('lodash');
require('./db/mongoose');

const offerRouter = require('./routers/offer');

const port = process.env.PORT || 3001;
var app = express();

let cors_options = 
{
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "allowedHeaders": ['Content-Type', 'Authorization', 'x-auth'],
    "exposedHeaders": ['Content-Range', 'X-Content-Range', 'x-auth']
  }

app.use(cors(cors_options));

app.use(bodyParser.json());
app.use(offerRouter);



app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});