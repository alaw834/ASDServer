const mongoose = require("mongoose");
//Simple model for Ingredients for Mongoose
const DaycareSchema = new mongoose.Schema({
    daycareName: {
        type: String,
        required: true,
    },
    daycareType: {
        type: String,
        required: true,
    },
    daycareDescription: {
        type: String,
        required: true,
    },
    daycareCapacity: {
        type: Number,
        required: true,
    },
    daycarePrice: {
        type: Number,
        required: true,
    }
    
},{collection:'Daycare',versionKey:false});


const DaycareModel = mongoose.model('Daycare', DaycareSchema);

module.exports = DaycareModel;