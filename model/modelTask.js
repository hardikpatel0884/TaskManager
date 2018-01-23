import { Schema } from 'mongoose';

/**
 * model/modelTask.js
 * task specification
 * CreatedAt: 22/01/2018 10:48 PM
 * Author: Hardik Patel
 */

const mongoose = require('mongoose');

const schemaTask = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user: {

    }
});