/**
 * server.js
 * main file
 * contain allroutes and work flow of application
 * CreatedAt: 22/01/2018
 * Author: Hardik Patel
 */

const express = require('express'),
    bodyParser = require('body-parser'),
    {config} = require('./config/config'),
    {mongoose} = require('./config/dbConnect'),
    {User} = require('./model/modelUser'),
    {Task} = require('./model/modelTask'),
    fs = require('fs'),
    hbs = require('hbs'),
    passport = require('passport'),
    session = require('express-session');

app = express();
app.use(session({secret: 'user'}))
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/views/user/'));
app.use(bodyParser());
app.use(bodyParser.json());
app.use((req, res, next) => {
    let log = `${new Date().toString()} : ${req.method} ${req.url}`;
    fs.appendFile('./server.log', log + "\n");

    if (req.url.toString() === "/user/login" || req.url.toString() === "/user/register") {
        next();
    } else {
        User.findOne({"apiKey": req.header("apiKey")}).then(user => {
            if (user) {
                if (req.body.user || req.query.user) {
                    if (req.body.user === user.id || req.query.user === user.id) {
                        next();
                    } else {
                        res.status(400).send({error: true, message: "you are not authorize to use this process"})
                    }
                } else {
                    next();
                }
                // res.send(user)
            } else {
                res.status(401).send({error: true, message: "unauthorized user"});
            }
        })
    }
});
app.use(passport.initialize());
app.use(passport.session());
require('./config/passportLocalAuth')(passport)
require('./routes/routeUser')(app, passport);
require('./routes/routeTask')(app);

app.get('/test', (req, res) => {
    res.send('tast tart')
});

app.get('/save', (req, res) => {
    var user = new User({
        name: 'hardik',
        email: 'hardik',
        password: 'hardik'
    });

    user.save().then((result) => {
        res.send(result);
    }, (e) => {
        res.send(e);
    })
});

app.listen(config.port, () => {
    console.log(`server listen on port no ${config.port}`)
});