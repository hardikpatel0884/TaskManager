/**
 * model/modelUser.js
 * contain specification of user model
 * CreatedAt: 23/01/2018 04:39 PM
 * Author: Hardik Patel
 * */

const mongoose = required('mongoose'), validator = required('validator'),bcrypt=required('bcrypt');

const scheemaUser = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validator: {
            validate: validator.isEmail,
            message: "{VALUE} is not valid email"
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

scheemaUser.pre('save',function (next) {

});

const User = mongoose.models("User", scheemaUser);
module.exports = {User};