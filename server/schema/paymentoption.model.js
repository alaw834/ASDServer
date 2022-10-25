const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const PaymentOptionSchema = new mongoose.Schema({
    userID: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    paymentType: {
        type: String,
        required: true,
    }
}, { collection: 'PaymentOption', versionKey: false });

const PaymentModel = mongoose.model('PaymentOption', PaymentOptionSchema);

module.exports = PaymentModel;