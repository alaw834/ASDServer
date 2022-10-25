import React from "react";

import "bootstrap/dist/css/bootstrap.css";

import ActivityBookingView from "../components/activities/activityBooking/activityBookingView";
import { ActivityBookingProvider } from "../components/activities/activityBooking/activityBookingContext";

export default function ActivityBooking() {
    return (
        <div>
            <br></br>
            <ActivityBookingProvider>
                <ActivityBookingView></ActivityBookingView>
            </ActivityBookingProvider>
        </div>
    );
}