/**
 * model/modelUser.js
 * user specification
 * CreatedAt: 22/01/2018 10:39 PM
 * Author: Hardik Patel
 */

const mongoose = require('mongoose'),
    validator = require('validator');

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
            message: "(VALUE) is not valid email"
        }
    },
    password: {
        type: String,
        required: true
    },
    apiKey: {
        type: String
    }
});

const User = mongoose.model('User', schemUser);
module.exports = { User }