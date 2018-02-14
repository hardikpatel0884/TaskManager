/**
 * model/modelUser.js
 * user specification
 * CreatedAt: 22/01/2018 10:39 PM
 * Author: Hardik Patel
 */

const mongoose = require('mongoose'),
    validator = require('validator'),
    bcrypt = require('bcrypt');

const schemUser = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "{VALUE} is not valid email"
        }
    },
    password: {
        type: String,
        required: true
    },
    apiKey: {
        type: String
    },
    image:{
        type:String,
        default:"user.png"
    },
    google: String,
    facebook: String
});

schemUser.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(this.password, salt, (err, hash) => {
                this.password = hash;
                /** generating api key */
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(Date.now().toString(), salt, (err, hash) => {
                        this.apiKey = hash;
                        next();
                    })
                })
            })
        })
    } else {
        next();
    }
});

schemUser.statics.findByApiKey = function (apiKey,cb) {
    this.model("User").findOne({apiKey: apiKey}).then(user => {
        if (user) {
            cb(user)
            // return user.id;
        } else {
            cb(false)
            // return false;
        }
    }, err => {
        cb(false)
        // return false;
    })
};
const User = mongoose.model('User', schemUser);
module.exports = {User}