import React, { useState } from "react";
import { useNavigate } from "react-router";

import { Button, Form, Container } from "react-bootstrap";

//create new activity
export default function CreateActivity() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    activityName: "",
    activityType: "",
    activityPrice: "",
    activityDescription: "",
    activityCapacity: 100,
    activityDate: "2022-10-05T14:00:00.000+00:00",
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  //validate user input
  //create activity button will not be enabled as long as input format is null or incorrect
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

  //when submit form, add the new activity in db
  async function onSubmit(e) {
    e.preventDefault();
    alert("Activity " + form.activityName + " added");

    const newActivity = { ...form };

    await fetch("http://localhost:5000/activities/addActivity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newActivity),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({
      activityName: "",
      activityType: "",
      activityPrice: "",
      activityDescription: "",
      activityCapacity: "",
      activityDate: "",
    });
    alert("You will now be taken back to the activity home page.");
    navigate("/components/activities");
  }

  //display create activity form
  return (
    <Container>
      <h1>Create a new Activity</h1>

      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="Activity Name">
          <Form.Label>Activity name</Form.Label>
          <Form.Control
            data-testid="activity-name"
            onChange={(e) => updateForm({ activityName: e.target.value })}
            type="text"
            placeholder="Enter activity name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Activity Type">
          <Form.Label>Activity Type</Form.Label>
          <Form.Control
            data-testid="activity-type"
            onChange={(e) => updateForm({ activityType: e.target.value })}
            type="text"
            placeholder="Enter activity Type"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Activity Price">
          <Form.Label>Activity Price</Form.Label>-
          <Form.Control
            data-testid="activity-price"
            onChange={(e) => updateForm({ activityPrice: e.target.value })}
            type="text"
            placeholder="Enter activity Price"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Activity Description">
          <Form.Label>Activity Description</Form.Label>
          <Form.Control
            data-testid="activity-description"
            onChange={(e) =>
              updateForm({ activityDescription: e.target.value })
            }
            type="text"
            placeholder="Enter activity Description"
          />
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="Activity Capacity">
                <Form.Label>Activity Capacity</Form.Label>
                <Form.Control data-testid= "activity-capacity" onChange={(e) => updateForm({ activityCapacity: e.target.value })} type="text" placeholder="Enter activity Capacity" />
            </Form.Group> */}

        {/* <Form.Group className="mb-3" controlId="Activity Date">
                <Form.Label>Activity Date</Form.Label>
                <Form.Control data-testid= "activity-date" onChange={(e) => updateForm({ activityDate: e.target.value })} type="text" placeholder="Enter activity Date" />
            </Form.Group> */}

        <Button
          data-testid="activity-submit"
          disabled={isDisabled()}
          type="submit"
          variant="secondary"
        >
          Create Activity
        </Button>
      </Form>
    </Container>
  );
}
