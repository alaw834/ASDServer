const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const CreditCardSchema = new mongoose.Schema({
    userID: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    cardNumber: {
        type: String,
        required: true,
    },
    expiryDate: {
        type: String,
        required: true,
    },
    holderName: {
        type: String,
        required: true,
    },
    cvv: {
        type: Number,
        required: true,
    }
}, { collection: 'CreditCard', versionKey: false });

const CreditCardModel = mongoose.model('CreditCard', CreditCardSchema);

module.exports = CreditCardModel;