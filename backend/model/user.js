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
            type: [
                {
                    taskID: String,
                    title: String,
                    created: String,
                    description: String,
                    expiry: {
                        date: String,
                        time: String
                    }
                }
            ],
        },
        pending: {
            type: [
                {
                    taskID: String,
                    title: String,
                    created: String,
                    description: String,
                    expiry: {
                        date: String,
                        time: String
                    }
                }
            ]
        },
        created: {
            type: [
                {
                    taskID: String,
                    title: String,
                    created: String,
                    description: String,
                    expiry: {
                        date: String,
                        time: String
                    }
                }
            ]
        }
    }
});

module.exports = mongoose.model('User', userSchema);