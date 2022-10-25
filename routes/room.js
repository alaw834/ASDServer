const express = require("express");

// roomRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const roomRoutes = express.Router();
const roomModel = require("../schema/room.model");
const jwt = require("jsonwebtoken");
const { Logger } = require("mongodb");
//Create one Room

roomRoutes.post("/addRoom", async (req, res) => {
  const newRoom = new roomModel({
    roomNumber: req.body.roomNumber,
    roomName: req.body.roomName,
    roomPrice: req.body.roomPrice,
    beds: req.body.beds,
    bedSize: req.body.bedSize,
    roomDescription: req.body.roomDescription,
    floor: req.body.floor,
    imageurl: req.body.imageurl,
  });
  //save new object database
  try {
    newRoom.save();
    console.log("saved");
    res.send("Peanuts");
  } catch (err) {
    console.log(err);
  }
});

//Read all Rooms
roomRoutes.get("/listAll", async (req, res) => {
  //search for all database resultsc

  roomModel.find({}, (err, result) => {
    //send results
    if (err) {
      res.send(err);
      console.log("Fail");
    }
    res.send(result);
  });
});

//Read one Room by ID
roomRoutes.get("/listRoom/:id", async (req, res) => {
  //search for all database results
  console.log("LIST ROOM BY ID " + req.params.id);
  roomModel.findById({ _id: req.params.id }, (err, result) => {
    //send results
    if (err) {
      res.send(err);
      console.log("Fail");
    }
    res.send(result);
  });
});

//Update one Room
roomRoutes.patch("/update/:id", async (req, res) => {
  try {
    const room = await roomModel.findOne({ _id: req.params.id });
    if (req.body.roomName) {
      room.roomName = req.body.roomName;
    }
    if (req.body.roomPrice) {
      room.roomPrice = req.body.roomPrice;
    }
    if (req.body.beds) {
      room.beds = req.body.beds;
    }
    if (req.body.bedSize) {
      room.bedSize = req.body.bedSize;
    }
    if (req.body.roomDescription) {
      room.roomDescription = req.body.roomDescription;
    }
    if (req.body.floor) {
      room.floor = req.body.floor;
    }
    if (req.body.roomNumber) {
      room.roomNumber = req.body.roomNumber;
    }
    if (req.body.imageurl) {
      room.imageurl = req.body.imageurl;
    }
    try {
      await room.save();
      console.log("Saved");
      res.send(room);
    } catch (err) {
      console.log(err);
    }
  } catch {
    res.status(404);
    res.send({ error: "Room doesn't exist!" });
  }
});

roomRoutes.delete("/delete/:id", async (req, res) => {
  console.log("Delete API Reached");
  // console.log(req.query(deletingRoom))
  console.log(req.body.id);
  try {
    await roomModel.deleteOne({ _id: req.body.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Room doesn't exist!" });
  }
});

module.exports = roomRoutes;
