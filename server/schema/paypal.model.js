const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const PaypalSchema = new mongoose.Schema({
    userID: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    paypalUsername: {
        type: String,
        required: true,
    }
}, { collection: 'PayPal', versionKey: false });

const PaypalModel = mongoose.model('PayPal', PaypalSchema);

module.exports = PaypalModel;