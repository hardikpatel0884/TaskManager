/**
 * config/connection.js
 * create connection with mongodb and application using mongoose
 * CreatedAt: 23/01/2018 04:30 PM
 * Author: Hardik Patel
 * */

const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost:27017/TaskManager");

module.exports={mongoose};

