import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router";

import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, Container } from "react-bootstrap";


export default function EditActivityBooking(props) {
  const params = useParams();
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  //retrieve current activity information from the db
  useEffect(() => {
    async function fetchActivityData() {
      const id = params.id.toString();
      console.log(id);
      const response = await fetch(`http://localhost:5000/activityBooking/listOne/${params.id.toString()}`);

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

  //set up form
  const [form, setForm] = useState({
    activityBookingName: "",
    activityBookingQuantity: "",
    activityBookingCost: "",
    activityBookingDate: ""
  });

  async function onSubmit(e) {
    e.preventDefault();
    const editedActivityBooking = {
      _id: params.id,
      activityBookingName: form.activityBookingName,
      activityID: form.activityID,
      activityBookingQuantity: form.activityBookingQuantity,
      activityBookingCost: form.activityBookingCost,
      activityBookingDate: form.activityBookingDate,
    };

    //send a post request to update the data in the database.
    await fetch("http://localhost:5000/activityBooking/update", {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedActivityBooking),
    });
    alert("Booking " + editedActivityBooking._id + " has been updated.");
    alert("You will now be taken back to the activity home page.")
    navigate("/components/activityBooking");
  }

  //validate user input to make sure it is the right format
  //update booking button will not be enabled as long as input format is incorrect
  const isDisabled = () => {
    if (
      form.activityBookingQuantity.trim() === "" ||
      isNaN(form.activityBookingQuantity)
    ) {
      return true;
    }
    return false;
  };

  //display form and take input from user
  return (
    <Container>
      <h1>Edit Existing Activity</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="Activity Name">
          <Form.Label>Activity Booking ID</Form.Label>
          <Form.Control disabled onChange={(e) => updateForm({ activityBookingID: e.target.value })} type="text" value={params.id} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Activity Name">
          <Form.Label>Activity ID</Form.Label>
          <Form.Control disabled onChange={(e) => updateForm({ activityID: e.target.value })} type="text" value={form.activityID} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Activity Name">
          <Form.Label>Activity Booking Name</Form.Label>
          <Form.Control disabled onChange={(e) => updateForm({ activityName: e.target.value })} type="text" value={form.activityBookingName} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Activity Booking Quantity">
          <Form.Label>Activity Booking Quantity</Form.Label>
          <Form.Control onChange={(e) => updateForm({ activityBookingQuantity: e.target.value })} type="text" placeholder={form.activityBookingQuantity} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Activity Booking Price">
          <Form.Label>Activity Booking Price</Form.Label>
          <Form.Control disabled onChange={(e) => updateForm({ activityPrice: e.target.value })} type="text" value={form.activityBookingCost} />
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="Activity Booking Date">
                <Form.Label>Activity Booking Date</Form.Label>
                <Form.Control disabled  onChange={(e) => updateForm({ activityBookingDate: e.target.value })}  type="text" value={form.activityBookingDate} />
            </Form.Group> */}
        <Button disabled={isDisabled()} type="submit" variant="secondary" >
          Update Activity Booking
        </Button>
      </Form>
    </Container>


  );
}


