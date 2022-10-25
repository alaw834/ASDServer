const mongoose = require("mongoose");
//Simple model for Ingredients for Mongoose
const DaycareBookingSchema = new mongoose.Schema({
    numberChildren: {
        type: Number,
        required: true,
    },
    dcDate: {
        type: Date,
        required: true,
    },
    dcTime: {
        type: String,
        required: true,
    },
    dcCost: {
        type: Number,
        required: true,
    },
    dcBookingStatus: {
        type: String,
        required: true,
    },
    isDcPaid: {
        type: Boolean,
        required: true,
    },
    dcLocation: {
        type: String,
        required: true,
    },
    daycareId: {
        type: String,
        required: true,
    },
    customerId: {
        type: String,
        required: true,
    }
    
},{collection:'DaycareBooking',versionKey:false});


const DaycareBookingModel = mongoose.model('DaycareBooking', DaycareBookingSchema);

module.exports = DaycareBookingModel;