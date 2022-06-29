const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
    },
    about: {
        type: String
    },
    tasks: {
        complete: {
            type: Array,
        },
        pending: {
            type: Array
        },
        created: {
            type: Array
        }
    }
});

module.exports = mongoose.model('User', userSchema);