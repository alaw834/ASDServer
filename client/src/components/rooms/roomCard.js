import React, { useContext } from "react";
import { Button, Card, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import RoomEditView from "./roomEditView";

import RoomDetailView from "./roomDetailView";

const RoomCard = (props) => {
  return (
    <Card>
      <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fA%3D%3D&w=1000&q=80" />
      <Card.Body>
        <Card.Title>{props.roomName}</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>Price: ${props.roomPrice} (per night)</ListGroup.Item>
        </ListGroup>
      </Card.Body>
      <Card.Footer>
        <Link
          to={`/components/rooms/roomdetailview/${props.id}`}
          Components={RoomDetailView}
        >
          <Button>More details</Button>
        </Link>
        {props.isEmployee && (
          <Link
            to={`/components/rooms/roomeditview/${props.id}`}
            Components={RoomEditView}
          >
            <Button>Edit</Button>
          </Link>
        )}
      </Card.Footer>
    </Card>
  );
};

export default RoomCard;
