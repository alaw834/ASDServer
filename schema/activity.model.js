const mongoose = require("mongoose");
//Simple model for Activity for Mongoose
const ActivitySchema = new mongoose.Schema({
    activityName: {
        type: String,
        required: true,
    },
    activityType: {
        type: String,
        required: true,
    },
    activityPrice: {
        type: Number,
        required: true,
    },
    activityDescription: {
        type: String,
        required: true,
    },
    activityCapacity: {
        type: Number,
        required: true,
    },
    activityDate:{
        type:Date,
        required:true,
    }
},{collection:'Activity',
versionKey: false
});


const ActivitiesModel = mongoose.model('Activity', ActivitySchema);

module.exports = ActivitiesModel;
