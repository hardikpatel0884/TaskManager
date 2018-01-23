/**
 * server.js
 * main file
 * contain allroutes and work flow of application
 * CreatedAt: 22/01/2018
 * Author: Hardik Patel
 */
const express = require('express'),
    bodyParser = require('body-parser'),
    { config } = require('./config/config'),
    {mongoose}=require('./config/conection'),
    app = express();

app.use(bodyParser());
app.use(bodyParser.json());

app.get('/test', (req, res) => {
    res.send('tast tart')
})

app.listen(config.port, () => {
    console.log(`server listen on port no ${config.port}`)
})