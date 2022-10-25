import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Form, Container, Button } from "react-bootstrap";

import { intValidation, decValidation, stringValidation } from "./validation";

const RoomEditView = () => {
  let params = useParams();
  const navigate = useNavigate();
  const [currentRoom, setCurrentRoom] = useState({});
  const [currentPrice, setCurrentPrice] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      console.log("the id is " + id);
      const response = await fetch(`http://localhost:5000/room/listRoom/${id}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setCurrentRoom(record);
      setCurrentPrice(record.roomPrice.$numberDecimal);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  const [roomName, setRoomName] = useState("");
  const [roomPrice, setRoomPrice] = useState();
  const [bedNum, setBedNum] = useState("");
  const [bedSizes, setBedSizes] = useState("");
  const [floor, setFloor] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomNumber, setRoomNumber] = useState();

  const handleValidation = () => {
    if (
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

    const editedRoom = {
      roomName: roomName,
      roomPrice: roomPrice,
      beds: bedNum,
      bedSize: bedSizes,
      roomDescription: roomDescription,
      floor: floor,
      imageurl: "floor",
      roomNumber: roomNumber,
    };
    console.log(editedRoom);
    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/room/update/${params.id.toString()}`, {
      method: "PATCH",
      body: JSON.stringify(editedRoom),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/components/rooms");
  }

  async function handleDelete(e) {
    e.preventDefault();
    const deleteMe = {
      id: params.id,
    };
    console.log(deleteMe.id);

    const response = await fetch(
      `http://localhost:5000/room/delete/${params.id}`,
      {
        method: "DELETE",
        body: JSON.stringify(deleteMe),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      console.log("error");
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    navigate("/components/rooms");
  }

  return (
    <Container>
      <h1>Edit room number {currentRoom.roomNumber}</h1>
      <Form>
        <Form.Group className="mb-3" controlId="Activity Name">
          <Form.Label>Room Name: {currentRoom.roomName}</Form.Label>

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
          <Form.Label>Room Price: ${currentPrice}</Form.Label>
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
          <Form.Label>Number of Beds: {currentRoom.beds}</Form.Label>
          <Form.Control
            onChange={(event) => {
              setBedNum(event.target.value);
            }}
            type="text"
            placeholder="Enter the Price Per Night"
            className={intValidation(bedNum) ? "is-valid" : "is-invalid"}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Bed Size">
          <Form.Label>Bed Sizes: {currentRoom.bedSize}</Form.Label>
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
          <Form.Label>Floor: {currentRoom.floor}</Form.Label>
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
          <Form.Label>
            Room Description: {currentRoom.roomDescription}
          </Form.Label>
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
          Edit Room
        </Button>

        <Button variant="primary" onClick={handleDelete}>
          Delete
        </Button>
      </Form>
    </Container>
  );
};
export default RoomEditView;
