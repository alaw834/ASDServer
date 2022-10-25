import React from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import { Button } from "react-bootstrap";

import ActivityView from "../components/activities/ActivityView";
import { ActivitiesProvider } from "../components/activities/ActivityContext";

export default function Activities() {
    return (
        <div>
          <br></br>
          <ActivitiesProvider>
            <Link to={{ pathname: "./createactivity" }}>
              <Button variant="secondary" style={{ float: "right" }}>
                Add new Activity
              </Button>
            </Link>
            <br></br>
            <ActivityView></ActivityView>
          </ActivitiesProvider>
        </div>
      );
    }
