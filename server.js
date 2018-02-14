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
    base64Img = require('base64-img'),
    fs = require('fs'),
    hbs = require('hbs'),
    passport = require('passport'),
    session = require('express-session');

app = express();
app.use(session({secret: 'user'}));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/views/user/'));
app.use(express.static(__dirname + '/image/'));
// app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser({limit: '500mb', extended: true}));
app.use((req, res, next) => {
    let log = `${new Date().toString()} : ${req.method} ${req.url}`;
    fs.appendFile('./server.log', log + "\n");

<<<<<<< HEAD
    if (req.url.toString() === "/user/login" || req.url.toString() === "/user/register" || req.url.toString() == "/image/user.*") {
        next();
    } else {
        User.findOne({"apiKey": req.header("apiKey")}).then(user => {
            if (user) {
                req.user = user;
                next();
=======
    // validate user for api apart of login and register
    if (req.url.toString() === "/user/login" || req.url.toString() === "/user/register") {
        next();
    } else {
        // check for valid apiKey
        /*User.findOne({"apiKey": req.header("apiKey")}).then(user => {
            if (user) {
                // check user want to check personal informaion
                if (req.body.user || req.query.user) {
                    if (req.body.user === user.id || req.query.user === user.id) {
                        // user want to check own personal information
                        next();
                    } else {
                        // user want check other's personal information
                        res.status(400).send({error: true, message: "you are not authorize to use this process"})
                    }
                } else {
                    // if user check own information
                    next();
                }
                // res.send(user)
>>>>>>> 6bc488d98013c9714d36e80229b4d2d392a95fee
            } else {
                res.status(401).send({error: true, message: "unauthorized user"});
            }
        })*/

        User.findByApiKey(req.header('apiKey'), (user) => {
            if (user) {
                req.user = user;
                next()
            } else {
                res.status(400).send("unauthorized user")
            }
        });
    }
});
app.use(passport.initialize());
app.use(passport.session());
// include passport local authentication
require('./config/passportLocalAuth')(passport);
// include user routes
require('./routes/routeUser')(app, passport);
// includes task routes
require('./routes/routeTask')(app);

<<<<<<< HEAD
// testing image upload
app.post('/upload', (req, res) => {
    console.log("start image")
    var isUpload = true;
    const imagString = req.body.image;
    const imagename = Date.now() + ".jpeg";
    let imagePath = './image/user/' + imagename
    fs.writeFile(imagePath, new Buffer(imagString, "base64"), (err) => {
        if (err) {
            isUpload = false;
            res.send({error:true,message:err})
        }
    });
    if (isUpload) {
        console.log('image:', req.user.id);
        User.findOneAndUpdate({_id: req.user.id}, {image: imagename}, {new: true}, (err, result) => {
            if (err) {
                res.send({error: true, message: "unable to upload image"});
            } else if (result) {
                res.status(200).send({error: false, message: "image uploaded", user: {result}});
            }
        })
    } else {
        res.send("thaygyu bhai");
    }
})

=======
>>>>>>> 6bc488d98013c9714d36e80229b4d2d392a95fee
app.listen(config.port, () => {
    console.log(`server listen on port no ${config.port}`)
});