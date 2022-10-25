import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Form, Container, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

import { intValidation, stringValidation } from "../validation";
import "react-datepicker/dist/react-datepicker.css";

const RoomBooking = () => {
  let params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const [currentRoom, setCurrentRoom] = useState({});

  const [bookingName, setBookingName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [bookingDate, setBookingDate] = useState(new Date());
  const [recieptNumber, setRecieptNumber] = useState(
    Math.floor(Math.random() * 1000000000)
  );

  const handleValidation = () => {
    if (intValidation(contactNumber) && stringValidation(bookingName)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
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
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  async function onSubmit(e) {
    e.preventDefault();

    if (!handleValidation()) {
      window.alert("Please insert the correct data types");
      return;
    }

    const newBooking = {
      bookingDate: bookingDate,
      bookingName: bookingName,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      contactNumber: contactNumber,
      recieptNumber: recieptNumber,
      roomName: currentRoom.roomName,
      roomNumber: currentRoom.roomNumber,
    };
    console.log(newBooking);
    // This will send a post request to update the data in the database.

    const response = await fetch("http://localhost:5000/booking/newBooking", {
      method: "POST",
      body: JSON.stringify(newBooking),
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
    window.alert(
      `Thanks ${bookingName}, you have Successfully Booked Room ${currentRoom.roomName}`
    );

    navigate("/components/rooms");
  }

  return (
    <Container>
      <h1>Book Room: {currentRoom.roomName} </h1>
      <Form>
        <Form.Group className="mb-3" controlId="Booking Name">
          <Form.Label>Booking Name: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a Booking Name"
            onChange={(event) => {
              setBookingName(event.target.value);
            }}
            className={
              stringValidation(bookingName) ? "is-valid" : "is-invalid"
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Contact Number Name">
          <Form.Label>Contact Number: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a Contact Number"
            onChange={(event) => {
              setContactNumber(event.target.value);
            }}
            className={intValidation(contactNumber) ? "is-valid" : "is-invalid"}
          />
        </Form.Group>
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

        <Button
          variant="primary"
          onClick={onSubmit}
          disabled={!handleValidation()}
        >
          Book
        </Button>
      </Form>
    </Container>
  );
};
export default RoomBooking;
