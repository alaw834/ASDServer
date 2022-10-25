import React, { useContext, useState } from "react";
import { Row, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

import RoomCard from "./roomCard";
import { RoomsContext } from "./roomsContext";
import RoomAddView from "./roomAddView";

// Here, we display our Navbar
export default function RoomsView() {
  const { allRooms, setAllRooms, currentRoom, isEmployee, setIsEmployee } =
    useContext(RoomsContext);

  console.log(allRooms);
  const [currentAllRooms, setCurrentAllRooms] = useState(allRooms);

  const handleSwitch = () => {
    setIsEmployee(!isEmployee);
  };

  const handleAdd = () => {};

  return (
    <Container>
      <h1>Room Catalogue</h1>
      <Button variant="secondary" onClick={handleSwitch}>
        {isEmployee ? "Set user view" : "Set employee View"}
      </Button>
      {isEmployee && (
        <Link to={`/components/rooms/roomaddview`} Components={RoomAddView}>
          <Button variant="secondary">Add room</Button>
        </Link>
      )}
      <Row
        className="g-3 mt-3 row-cols-xxl-3 row-cols-xxxl-4"
        xs={1}
        sm={1}
        md={2}
        lg={2}
        xl={2}
      >
        {allRooms.map((room, index) => (
          <RoomCard
            key={room._id}
            id={room._id}
            roomName={room.roomName}
            roomPrice={room.roomPrice.$numberDecimal}
            isEmployee={isEmployee}
          />
        ))}
      </Row>
    </Container>
  );
}
