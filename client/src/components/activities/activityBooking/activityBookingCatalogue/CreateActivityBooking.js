import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Moment from 'moment';

import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, Container } from "react-bootstrap";

//create a new booking for an activity
export default function CreateActivityBooking() {
  const params = useParams();
  const navigate = useNavigate();

  //set up the form
  const [form, setForm] = useState({
    activityName: "",
    activityBookingQuantity: "",
    activityPrice: "",
    activityDate: ""
  });

  //retrieve activity details from the db
  useEffect(() => {
    async function fetchActivityData() {
      const id = params.id.toString();
      console.log(id);
      const response = await fetch(`http://localhost:5000/activities/listOne/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        console.log(id);
        window.alert(message);
        window.alert(id)
        return;
      }

      const activityData = await response.json();
      if (!activityData) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(activityData);
    }

    fetchActivityData();

    return;
  }, [params.id, navigate]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  //validate user input to make sure it is the right format
  //create booking button will not be enabled as long as input format is incorrect
  const isDisabled = () => {
    if (form.activityBookingQuantity === undefined) {
      return true;
    }
    else if (
      form.activityBookingQuantity.trim() === "" ||
      isNaN(form.activityBookingQuantity)
    ) {
      return true
    }
    return false;
  };

  //when submit form, add the new activity booking in db
  async function onSubmit(e) {
    e.preventDefault();
    alert("Activity booking for " + form.activityName + " added")

    const newActivityBooking = { ...form };
    await fetch("http://localhost:5000/activityBooking/createActivityBooking/:id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newActivityBooking),
    })
      .catch(error => {
        window.alert(error);
        return;
      });

    setForm({ activityID: "", activityName: "", activityBookingQuantity: "", activityPrice: "", activityBookingDate: "" });
    alert("You will now be taken back to the activity booking page.")
    navigate("/components/activityBooking/")
  }

  //display activity booking form
  return (
    <Container>
      <h1>Create a new Activity Booking</h1>

      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="Activity Booking ID">
          <Form.Label>Activity Booking ID</Form.Label>
          <Form.Control disabled onChange={(e) => updateForm({ activityID: e.target.value })} type="text" value={params.id} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Activity Name">
          <Form.Label>Activity Booking Name</Form.Label>
          <Form.Control disabled onChange={(e) => updateForm({ activityName: e.target.value })} type="text" value={form.activityName} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Activity Booking Quantity">
          <Form.Label>Activity Booking Quantity</Form.Label>
          <Form.Control onChange={(e) => updateForm({ activityBookingQuantity: e.target.value })} type="text" placeholder="Enter number of people" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Activity Booking Price">
          <Form.Label>Activity Booking Price</Form.Label>
          <Form.Control disabled onChange={(e) => updateForm({ activityPrice: e.target.value })} type="text" value={form.activityPrice} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Activity Booking Date">
          <Form.Label>Activity Booking Date</Form.Label>
          <Form.Control disabled onChange={(e) => updateForm({ activityBookingDate: e.target.value })} type="text" value={Moment(new Date(form.activityDate)).format('MM/DD/YYYY')} />
        </Form.Group>
        <Button disabled={isDisabled()} type="submit" variant="secondary" >
          Book Activity
        </Button>

      </Form>
    </Container>


  );
}


