import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Container, Button, ListGroup, Card } from "react-bootstrap";
import DatePicker from "react-datepicker";

const BookingEditView = () => {
  let params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const [currentBooking, setCurrentBooking] = useState({});

  const [bookingName, setBookingName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      console.log("the id is " + id);
      const response = await fetch(
        `http://localhost:5000/booking/listBooking/${id}`
      );

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
      setCurrentBooking(record);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  async function onSubmit(e) {
    e.preventDefault();
    const editedRoom = {
      bookingDate: currentBooking.bookingDate,
      bookingName: currentBooking.bookingName,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      contactNumber: currentBooking.contactNumber,
      recieptNumber: currentBooking.recieptNumber,
      roomName: currentBooking.roomName,
      roomNumber: currentBooking.roomNumber,
    };
    console.log(editedRoom);
    // This will send a post request to update the data in the database.
    await fetch(
      `http://localhost:5000/booking/update/${params.id.toString()}`,
      {
        method: "PATCH",
        body: JSON.stringify(editedRoom),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.alert("Room Booking Edited Successfully");

    navigate("/components/rooms");
  }

  return (
    <Container>
      <h1>View or Edit Room Booking: </h1>
      <Card.Title>
        Booking for Room {currentBooking.roomNumber} - {currentBooking.roomName}{" "}
      </Card.Title>
      <ListGroup variant="flush">
        <ListGroup.Item>
          Booking Name: {currentBooking.bookingName}
        </ListGroup.Item>
      </ListGroup>
      <ListGroup variant="flush">
        <ListGroup.Item>
          Contact Number: {currentBooking.contactNumber}
        </ListGroup.Item>
      </ListGroup>
      <ListGroup variant="flush">
        <ListGroup.Item>
          Reciept Number: {currentBooking.recieptNumber}
        </ListGroup.Item>
      </ListGroup>
      <ListGroup variant="flush">
        <ListGroup.Item>
          Booking Date: {String(currentBooking.bookingDate).slice(0, 10)}
        </ListGroup.Item>
      </ListGroup>
      <Form>
        <Form.Group className="mb-3" controlId="checkin">
          <Form.Label>Check in Date:</Form.Label>
          <DatePicker
            selected={checkInDate}
            onChange={(date) => setCheckInDate(date)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="checkout">
          <Form.Label>Check out Date:</Form.Label>
          <DatePicker
            selected={checkOutDate}
            onChange={(date) => setCheckOutDate(date)}
          />
        </Form.Group>
        <Button variant="primary" onClick={onSubmit}>
          Book
        </Button>
      </Form>
    </Container>
  );
};
export default BookingEditView;
