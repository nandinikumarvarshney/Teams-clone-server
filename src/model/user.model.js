const mongoose = require('mongoose');

//defined user schema
const UserSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            require: true
        },
        middlename: {
            type: String,
            require: true
        },
        lastname: {
            type: String,
            require: true
        },
        password: {
            type: String,
            required: true,
            min: 8,
        },
        status: {
            type: String,
            default:"Avaliable"
        },
        statusMessage: {
            type: String,
            default:""
        },
        organisation: {
            type: String,
            require: true,
        },
        location: {
            type: String,
            require: true,
        },
        position: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true,
            max: 10
        }
    },
    { timestamps: true }
);

const user = mongoose.model("User", UserSchema);

module.exports = user;