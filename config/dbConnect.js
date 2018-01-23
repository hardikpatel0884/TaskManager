/**
 * config/dbConnect.js
 * database connection with mongodb
 * CreatedAt: 22/01/2018 10:35 PM
 * Author: Hardik Patel
 */

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TaskManager');
module.exports = { mongoose }