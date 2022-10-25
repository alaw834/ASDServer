const mongoose = require("mongoose");
//Simple model for activity booking for Mongoose
const ActivityBookingSchema = new mongoose.Schema({
    activityBookingName: {
        type: String,
        required: true,
    },
    activityID:{
        type: String,
        required:true,
    },
    activityBookingQuantity: {
        type: String,
        required: true,
    },
    activityBookingCost: {
        type: Number,
        required: true,
    },
    activityBookingDate: {
        type: Date,
        required: true,
    },
    isActivityCancelled: {
        type: Boolean,
        required: true,
    },
    isActivityPaid: {
        type: Boolean,
        required: true,
    },
},{collection:'ActivityBooking',
versionKey: false
});

const ActivityBookingModel = mongoose.model('ActivityBooking', ActivityBookingSchema);

module.exports = ActivityBookingModel;
