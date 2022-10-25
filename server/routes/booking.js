const express = require("express");

// bookingRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const bookingRoutes = express.Router();
const bookingModel = require("../schema/booking.model");
const jwt = require("jsonwebtoken");
const { Logger } = require("mongodb");
//Create one Booking

bookingRoutes.post("/newBooking", async (req, res) => {
  const newBooking = new bookingModel({
    roomName: req.body.roomName,
    roomNumber: req.body.roomNumber,
    checkInDate: req.body.checkInDate,
    checkOutDate: req.body.checkOutDate,
    bookingName: req.body.bookingName,
    contactNumber: req.body.contactNumber,
    recieptNumber: req.body.recieptNumber,
    bookingDate: req.body.bookingDate,
  });
  //save new object database
  try {
    newBooking.save();
    console.log("saved");
    res.send("Peanuts");
  } catch (err) {
    console.log(err);
  }
});

//Read all Bookings
bookingRoutes.get("/listAll", async (req, res) => {
  //search for all database resultsc

  bookingModel.find({}, (err, result) => {
    //send results
    if (err) {
      res.send(err);
      console.log("Fail");
    }
    res.send(result);
  });
});

//Read one Booking by ID
bookingRoutes.get("/listBooking/:id", async (req, res) => {
  //search for all database results
  console.log("list Booking by ID " + req.params.id);
  bookingModel.findById({ _id: req.params.id }, (err, result) => {
    //send results
    if (err) {
      res.send(err);
      console.log("Fail");
    }
    res.send(result);
  });
});

//Update one Booking
bookingRoutes.patch("/update/:id", async (req, res) => {
  try {
    const booking = await bookingModel.findOne({ _id: req.params.id });

    if (req.body.roomName) {
      booking.roomName = req.body.roomName;
    }
    if (req.body.roomNumber) {
      booking.roomNumber = req.body.roomNumber;
    }
    if (req.body.checkInDate) {
      booking.checkInDate = req.body.checkInDate;
    }
    if (req.body.checkOutDate) {
      booking.checkOutDate = req.body.checkOutDate;
    }
    if (req.body.bookingName) {
      booking.bookingName = req.body.bookingName;
    }
    if (req.body.contactNumber) {
      booking.contactNumber = req.body.contactNumber;
    }
    if (req.body.bookingDate) {
      booking.bookingDate = req.body.bookingDate;
    }
    try {
      await booking.save();
      console.log("Saved");
      res.send(booking);
    } catch (err) {
      console.log(err);
    }
  } catch {
    res.status(404);
    res.send({ error: "Booking doesn't exist!" });
  }
});

bookingRoutes.delete("/delete/:id", async (req, res) => {
  console.log("Delete API Reached");
  // console.log(req.query(deletingBooking))
  console.log(req.body.id);
  try {
    await bookingModel.deleteOne({ _id: req.body.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Booking doesn't exist!" });
  }
});

module.exports = bookingRoutes;
