const { Double, Int32, Decimal128 } = require("mongodb");
const mongoose = require("mongoose");
//Simple model for Ingredients for Mongoose
const RoomSchema = new mongoose.Schema(
  {
    roomName: { type: String, required: true },
    roomPrice: { type: Decimal128, required: true },
    beds: { type: Number, required: true },
    bedSize: { type: String, required: true },
    roomDescription: { type: String, required: true },
    floor: { type: Number, required: true },
    roomNumber: { type: Number, required: true },
    imageurl: { type: String, required: true },
  },
  { collection: "Rooms", versionKey: false }
);

const RoomModel = mongoose.model("Rooms", RoomSchema);

module.exports = RoomModel;
