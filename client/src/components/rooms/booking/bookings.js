import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { Button, Container, Row, Card, ListGroup } from "react-bootstrap";
import BookingEditView from "./bookingEditView";

const Bookings = () => {
  const [isEmployee, setIsEmployee] = useState(false);
  const [allBookings, setAllBookings] = useState([]);

  const handleSwitch = () => {
    setIsEmployee(!isEmployee);
  };

  useEffect(() => {
    async function getBookings() {
      const response = await fetch("http://localhost:5000/booking/listAll");
      if (!response.ok) {
        console.log("error");
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const bookings = await response.json();
      setAllBookings(bookings);
      console.log(bookings);
    }
    getBookings();
  }, [allBookings.length]);

  async function handleDelete(e) {
    e.preventDefault();
    const deleteMe = {
      id: e.target.id,
    };
    console.log(deleteMe.id);

    const response = await fetch(
      `http://localhost:5000/booking/delete/${e.target.id}`,
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
    setAllBookings([]);
  }

  return (
    <Container>
      <h1>All Bookings</h1>
      <Button variant="secondary" onClick={handleSwitch}>
        {isEmployee ? "Set user view" : "Set employee View"}
      </Button>
      <Row
        className="g-3 mt-3 row-cols-xxl-3 row-cols-xxxl-4"
        xs={1}
        sm={1}
        md={2}
        lg={2}
        xl={2}
      >
        {allBookings.map((booking, index) => (
          <Card>
            {/* <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fA%3D%3D&w=1000&q=80" /> */}
            <Card.Body>
              <Card.Title>
                Booking for Room {booking.roomNumber} - {booking.roomName}{" "}
              </Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Check In Date: {String(booking.checkInDate).slice(0, 10)}
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Check Out Date: {String(booking.checkOutDate).slice(0, 10)}
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Booking Name: {booking.bookingName}
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Contact Number: {booking.contactNumber}
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Reciept Number: {booking.recieptNumber}
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Booking Date: {String(booking.bookingDate).slice(0, 10)}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>

            {isEmployee && (
              <Card.Footer>
                <Link
                  to={`/components/bookingeditview/${booking._id}`}
                  Components={BookingEditView}
                >
                  <Button>Edit</Button>
                </Link>
                <Button onClick={handleDelete} id={booking._id}>
                  Delete
                </Button>
              </Card.Footer>
            )}
          </Card>
        ))}
      </Row>
    </Container>
  );
};
export default Bookings;
