
// import mongoose package
const mongoose = require('mongoose');

// create Schema
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true, 
        },
        lastName: {
            type: String,
            required: true,
        }
    }
);

// export the model
module.exports = mongoose.model('User', UserSchema, 'User');

