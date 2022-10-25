import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, Container } from "react-bootstrap";

export default function EditActivity(props) {
  const params = useParams();
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  //retrieve activity data from db using id
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

  //set up form
  const [form, setForm] = useState({
    activityName: "",
    activityType: "",
    activityPrice: "",
    activityDescription: "",
    activityCapacity: "",
    activityDate: ""
  });

  //when submit, update the activity in db
  async function onSubmit(e) {
    e.preventDefault();
    const editedActivity = {
      _id: params.id,
      activityName: form.activityName,
      activityType: form.activityType,
      activityCapacity: form.activityCapacity,
      activityPrice: form.activityPrice,
      activityDescription: form.activityDescription,
      activityDate: form.activityDate
    };

    // This will send a post request to update the data in the database.
    await fetch("http://localhost:5000/activities/update", {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedActivity),
    });
    alert("Activity " + editedActivity._id + " " + editedActivity.activityName + " has been updated.");
    alert("You will now be taken back to the activity home page.")
    navigate("/components/activities");
  }

  //validate user input to make sure it is the right format
  //update activity button will not be enabled as long as input format is incorrect
  const isDisabled = () => {
    if (
      form.activityName.trim() === "" ||
      form.activityPrice.toString().trim() === "" ||
      isNaN(form.activityPrice) ||
      form.activityType.trim() === "" ||
      form.activityDescription.trim() == ""
      // form.activityCapacity.toString().trim() === "" ||
      // isNaN(form.activityCapacity) ||
      // form.activityDate.trim() == ""

    ) {
      return true;
    }
    return false;
  };

  //display edit form
  return (
    <Container>
      <h1>Edit Existing Activity</h1>

      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="Activity Name">
          <Form.Label>Activity name</Form.Label>
          <Form.Control onChange={(e) => updateForm({ activityName: e.target.value })} type="text" placeholder={form.activityName} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Activity Type">
          <Form.Label>Activity Type</Form.Label>
          <Form.Control onChange={(e) => updateForm({ activityType: e.target.value })} type="text" placeholder={form.activityType} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Activity Price">
          <Form.Label>Activity Price</Form.Label>
          <Form.Control onChange={(e) => updateForm({ activityPrice: e.target.value })} type="text" placeholder={form.activityPrice} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Activity Description">
          <Form.Label>Activity Description</Form.Label>
          <Form.Control onChange={(e) => updateForm({ activityDescription: e.target.value })} type="text" placeholder={form.activityDescription} />
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="Activity Capacity">
                <Form.Label>Activity Capacity</Form.Label>
                <Form.Control onChange={(e) => updateForm({ activityCapacity: e.target.value })} type="text" placeholder={form.activityCapacity} />
            </Form.Group> */}
        {/* <Form.Group className="mb-3" controlId="Activity Date">
                <Form.Label>Activity date</Form.Label>
                <Form.Control onChange={(e) => updateForm({ activityDate: e.target.value })} type="text" placeholder={form.activityDate} />
            </Form.Group> */}

        <Button disabled={isDisabled()} type="submit" variant="secondary" >
          Edit Activity
        </Button>

      </Form>
    </Container>


  );
}


