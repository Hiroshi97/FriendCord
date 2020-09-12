const mongoose = require('mongoose');
let friends = require("mongoose-friends");

const UserSchema = mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ""
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
}).plugin(friends());


module.exports = mongoose.model('User', UserSchema, "users");