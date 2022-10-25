const mongoose = require("mongoose");
//Simple model for Ingredients for Mongoose
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    emailAddress: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true
    },
    postcode: {
        type: String,
        required: true
    },
    streetNumber: {
        type: Number,
        required: true
    },
    streetName: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: false
    },
    registeredDate: {
        type: Date,
        required: true
    }
}, { collection: 'User', versionKey: false });


const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;