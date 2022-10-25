const { Double, Int32, Decimal128 } = require("mongodb");
const mongoose = require("mongoose");
//Simple model for Ingredients for Mongoose
const BookingSchema = new mongoose.Schema(
  {
    roomName: { type: String, required: true },
    roomNumber: { type: Number, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    bookingName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    recieptNumber: { type: String, required: true },
    bookingDate: { type: Date, required: true },
  },
  { collection: "RoomBooking", versionKey: false }
);

const BookingModel = mongoose.model("RoomBooking", BookingSchema);

module.exports = BookingModel;
