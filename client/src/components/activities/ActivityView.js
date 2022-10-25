import React, { useContext } from "react";

import "bootstrap/dist/css/bootstrap.css";
import { Row, Container } from "react-bootstrap";

import ActivityCard from "./catalogue/ActivityCard";
import { ActivityContext } from "./ActivityContext";

//loops through the activity list and display in cards
export default function ActivityView() {
  const { currentActivityList } = useContext(ActivityContext);

  return (
    <Container>
      <h1>Activity Catalogue</h1>

      <Row className="g-4 mt-4 row-cols-xxl-4 row-cols-xxxl-4" md={4}>
        {currentActivityList.map((activity) => (
          <ActivityCard activity={activity} key={activity._id} />
        ))}
      </Row>
    </Container>
  );
}
