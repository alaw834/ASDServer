import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Form, Container, Button } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";

import { intValidation, decValidation, stringValidation } from "./validation";

const RoomAddView = () => {
  var regDec = /^-?\d+\.?\d*$/;
  var regInt = /^-?\d+$/;

  let params = useParams();
  const navigate = useNavigate();
  const id = params.id;

  const [currentRoom, setCurrentRoom] = useState({});
  const [currentPrice, setCurrentPrice] = useState(0);

  const [roomName, setRoomName] = useState("");
  const [roomPrice, setRoomPrice] = useState();
  const [bedNum, setBedNum] = useState("");
  const [bedSizes, setBedSizes] = useState("");
  const [floor, setFloor] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomNumber, setRoomNumber] = useState();

  const handleValidation = () => {
    if (
      intValidation(roomNumber) &&
      decValidation(roomPrice) &&
      intValidation(bedNum) &&
      intValidation(floor) &&
      stringValidation(roomDescription) &&
      stringValidation(roomName) &&
      stringValidation(bedSizes)
    ) {
      return true;
    }
    return false;
  };

  async function onSubmit(e) {
    e.preventDefault();

    if (!handleValidation()) {
      window.alert("Please insert the correct data types");
      return;
    }

    const newRoom = {
      roomName: roomName,
      roomPrice: parseFloat(roomPrice),
      beds: parseInt(bedNum),
      bedSize: bedSizes,
      roomDescription: roomDescription,
      floor: parseInt(floor),
      imageurl: "imageurl",
      roomNumber: parseInt(roomNumber),
    };

    // This will send a post request to update the data in the database.

    const response = await fetch("http://localhost:5000/room/addRoom", {
      method: "POST",
      body: JSON.stringify(newRoom),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log("error");
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    window.alert("Room Successfully Added");

    navigate("/components/rooms");
  }

  function isValidInt(input) {
    return regInt.test(input);
  }

  return (
    <Container>
      <h1>Add a new Room</h1>
      <Form>
        <Form.Group className="mb-3" controlId="Activity Name">
          <Form.Label>Room Number:</Form.Label>

          <Form.Control
            onChange={(event) => {
              setRoomNumber(event.target.value);
            }}
            type="text"
            placeholder="Enter a Room Number"
            className={intValidation(roomNumber) ? "is-valid" : "is-invalid"}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Activity Name">
          <Form.Label>Room Name:</Form.Label>

          <Form.Control
            onChange={(event) => {
              setRoomName(event.target.value);
            }}
            type="text"
            placeholder="Enter a Room Name"
            className={stringValidation(roomName) ? "is-valid" : "is-invalid"}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Room Price">
          <Form.Label>Room Price</Form.Label>
          <Form.Control
            onChange={(event) => {
              setRoomPrice(event.target.value);
            }}
            type="text"
            placeholder="Enter the Price Per Night"
            className={decValidation(roomPrice) ? "is-valid" : "is-invalid"}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Number of Beds">
          <Form.Label>Number of Beds</Form.Label>
          <Form.Control
            onChange={(event) => {
              setBedNum(event.target.value);
            }}
            type="text"
            placeholder="Enter the Number of Beds"
            className={intValidation(bedNum) ? "is-valid" : "is-invalid"}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Bed Size">
          <Form.Label>Bed Sizes</Form.Label>
          <Form.Control
            onChange={(event) => {
              setBedSizes(event.target.value);
            }}
            type="text"
            placeholder="Enter the Sizes of the beds"
            className={stringValidation(bedSizes) ? "is-valid" : "is-invalid"}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Floor">
          <Form.Label>Floor</Form.Label>
          <Form.Control
            onChange={(event) => {
              setFloor(event.target.value);
            }}
            type="text"
            placeholder="Enter the Floor the Room is on"
            className={intValidation(floor) ? "is-valid" : "is-invalid"}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Description">
          <Form.Label>Room Description</Form.Label>
          <Form.Control
            onChange={(event) => {
              setRoomDescription(event.target.value);
            }}
            type="text"
            placeholder="Enter the Room Description"
            className={
              stringValidation(roomDescription) ? "is-valid" : "is-invalid"
            }
          />
        </Form.Group>

        <Button
          variant="primary"
          onClick={onSubmit}
          disabled={!handleValidation()}
        >
          Add New Room
        </Button>
      </Form>
    </Container>
  );
};
export default RoomAddView;
