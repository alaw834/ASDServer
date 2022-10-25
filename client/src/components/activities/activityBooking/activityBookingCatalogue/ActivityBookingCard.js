import React from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import { Card, ListGroup, Button, Row, Col, Container } from "react-bootstrap";

import EditActivityBooking from "./EditActivityBooking";


const ActivityBookingCard = (props) => {
  const { activityBooking: activityBooking } = props;

  //ask user if they want to delete a selected booking
  //if yes delete - if no do nothing
  async function deleteActivityBooking(id) {
    if (window.confirm("Are you sure you want to delete booking " + activityBooking._id + " for " + activityBooking.activityBookingName + "?")) {
      await fetch(`http://localhost:5000/activityBooking/delete/${id}`, {
        method: "DELETE"
      });
      alert(activityBooking._id + " has been deleted.")
      window.location.reload();
    }
    else {
      alert(activityBooking._id + " has not been deleted.")
    }

  }

  //display all the bookings made in cards
  return (
    <div>
      <Card >
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>Booking ID: {activityBooking._id}</ListGroup.Item>
            <ListGroup.Item>Activity: {activityBooking.activityBookingName}</ListGroup.Item>
            <ListGroup.Item>Price: ${activityBooking.activityBookingCost}</ListGroup.Item>
            <ListGroup.Item>Number of people: {activityBooking.activityBookingQuantity}</ListGroup.Item>
          </ListGroup>
        </Card.Body>

        <Card.Footer>
          <Container>
            <Row>
              <Col>
                <Link to={'./editActivityBooking/' + activityBooking._id} Component={EditActivityBooking}><Button variant="secondary">Edit Booking</Button></Link>
              </Col>
              <Col>
                <Button onClick={() => deleteActivityBooking(activityBooking._id)} variant="secondary">Delete Booking</Button>
              </Col>
            </Row>
          </Container>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default ActivityBookingCard;
