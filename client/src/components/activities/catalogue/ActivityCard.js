import { Link } from 'react-router-dom';

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';

import EditActivity from "./EditActivity";
import CreateActivityBooking from "../activityBooking/activityBookingCatalogue/CreateActivityBooking";

//cards to display all the activities retrieved form the datbase
const ActivityCard = (props) => {
  const { activity } = props;

  //deleting an activity
  async function deleteActivity(id) {
    // alert("Are you sure you want to delete" + activity._id + " with the name . " + activity.activityName)
    // await fetch(`http://localhost:5000/activities/delete/${id}`, {
    //   method: "DELETE"
    // });
    // alert(activity._id + " has been deleted.")
    // window.location.reload();

    if (window.confirm("Are you sure you want to delete activity  " + activity._id + " " + activity.activityName + "?")) {
      await fetch(`http://localhost:5000/activities/delete/${id}`, {
        method: "DELETE"
      });
      alert(activity.activityName + " has been deleted.")
      window.location.reload();
    }
    else {
      alert(activity.activityName + " has not been deleted.")
    }
  }

  //card display and options
  return (

    <div>
      <Card >
        <Card.Img variant="top" src="http://placekitten.com/200/200" />
        <Card.Body>
          <Card.Title>{activity.activityName}</Card.Title>
          <ListGroup variant="flush">
            {/* <ListGroup.Item>Activity ID:{activity._id}</ListGroup.Item> */}
            <ListGroup.Item>{activity.activityDescription}</ListGroup.Item>
            <ListGroup.Item>Price: ${activity.activityPrice}</ListGroup.Item>
            {/* <ListGroup.Item>Capacity:{activity.activityCapacity}</ListGroup.Item> */}
            <ListGroup.Item>Type: {activity.activityType}</ListGroup.Item>
          </ListGroup>
        </Card.Body>

        <Card.Footer>
          <Container>
            <Row >
              <Link to={'/components/activityBooking/createActivityBooking/' + activity._id} Component={CreateActivityBooking}><Button variant="secondary" size="lg">Make Activity Booking</Button></Link>
              <br></br>
            </Row>
            <Row>
              {/* <Col>
                <Button variant="secondary">Details</Button>
              </Col> */}
              <Col>
                <Link to={'./editActivity/' + activity._id} Component={EditActivity}><Button variant="secondary">Edit Activity</Button></Link>
              </Col>
              <Col>
                <Button onClick={() => deleteActivity(activity._id)} variant="secondary">Delete</Button>
              </Col>
            </Row>
          </Container>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default ActivityCard;
