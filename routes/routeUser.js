/**
 * routes/routeUser.js
 * user endpoint containing user operations
 * CreatedAt: 26/01/2018 4:12 PM
 * Author: Hardik Patel
 * */
const {User} = require('./../model/modelUser');
module.exports = (app, passport) => {
    /**
     * GET /user/register
     * get register view
     * */
    app.get('/user/register', (req, res) => {
        res.render('userRegister.hbs');
    });

    /**
     * POST /user/register
     * register user
     * */
    app.post('/user/register', (req, res) => {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        user.save().then((user) => {
            res.set("apiKey", user.apiKey).status(201).send({
                Register: {
                    error: false,
                    message: "success",
                    user: {"name": user.name, "email": user.email}
                }
            });
            //res.status(201).send(`Welcome ${user.name} as ${user.email}`);
        }, (e) => {
            res.status(200).send({Register: {error: true, message: "fail to register "+e}});
            // res.render('userRegister.hbs',{'error':e.toString()});
        })
    });

    /**
     * GET /user/login
     * get login view
     * */
    app.get('/user/login', (req, res) => {
        res.render('userLogin.hbs');
    });

    /**
     * POST /user/login
     * user login
     * */
    app.post('/user/login', passport.authenticate('local', {
        successRedirect: '/user/profile',
        failurRedirect: '/user/fail',
    }));

    /**
     * GET /user/profile
     * get user profile details
     * */
    app.get('/user/profile', (req, res) => {
        res.set("apiKey", req.session.passport.user.apiKey).status(200).send({
            Login: {
                error: false,
                message: "success",
                user: {"name": req.session.passport.user.name, "email": req.session.passport.user.email,"_id":req.session.passport.user.id}
            }
        });
        //res.render('userProfile.hbs',req.session.passport.user)
    })

    /**
     * GET /user/fail
     * when authentication fails
     * */
    app.get('/user/fail', (req, res) => {
        res.status(200).send({Login: {error: true, message: "login fail"}});
        // res.render('userLogin.hbs',{error:"enter valid username or password"})
    })

    /**
     * GET /user/logout
     * logout user
     * */
    app.get('/user/logout', (req, res) => {
        req.session.destroy((err) => {
            console.log(err)
        })
        res.render('userLogin.hbs')
    })


    /**
     * GET /user/get
     * get list of all user details
     * */
    app.get('/user/get', (req, res) => {
        console.log("start");
        User.find().then(user=>{
            res.send({"users":user})
        },e=>{
            res.send(e)
        })
    });
};