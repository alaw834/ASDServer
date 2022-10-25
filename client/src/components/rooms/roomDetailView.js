import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Form, Container, Button } from "react-bootstrap";

import RoomBooking from "./booking/roomBooking";

const RoomDetailView = () => {
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

  return (
    <Container>
      <h1>Room Details</h1>
      <br />
      <h3>Room Name: {currentRoom.roomName}</h3>
      <h3>Room Price Per Night: ${currentPrice}</h3>
      <h3>Number of Beds: {currentRoom.beds}</h3>
      <h3>Sizes of Beds: {currentRoom.bedSize}</h3>
      <h3>Floor: {currentRoom.floor}</h3>
      <h3>Room Description: {currentRoom.roomDescription}</h3>
      <br></br>
      <Link
        to={`/components/rooms/roombooking/${params.id}`}
        Components={RoomBooking}
      >
        <Button>Book Room</Button>
        <br></br>
      </Link>
      <br></br>
      <img
        src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
        style={{ width: "50%" }}
      />
    </Container>
  );
};
export default RoomDetailView;
