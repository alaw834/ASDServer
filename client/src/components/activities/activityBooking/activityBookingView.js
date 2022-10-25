import React, { useContext } from "react";

import "bootstrap/dist/css/bootstrap.css";
import { Row, Container } from "react-bootstrap";

import ActivityBookingCard from "./activityBookingCatalogue/ActivityBookingCard";
import { ActivityBookingContext } from "./activityBookingContext";

//display all the bookings in cards
export default function ActivityView() {

  const {
    currentActivityBookingList
  } = useContext(ActivityBookingContext);

  return (
    <Container>
      <h1>Activity Booking List</h1>

      <Row
        className="g-4 mt-4 row-cols-xxl-4 row-cols-xxxl-4"
        md={4}
      >
        {currentActivityBookingList.map((activityBooking) => (
          <ActivityBookingCard activityBooking = {activityBooking} key = {activityBooking._id}/>
        ))}
      </Row>
    </Container>
  );
}
