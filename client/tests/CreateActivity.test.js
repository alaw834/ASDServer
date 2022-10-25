import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import CreateActivity from "../src/components/activities/catalogue/CreateActivity";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";

test("renders react component", async () => {
  render(
    <Router>
      <CreateActivity />
    </Router>
  );
});

describe("Create Activity Form is disabled", () => {
  it("Checks if submit button form is disabled", () => {
    const { getByTestId } = render(
      <Router>
        <CreateActivity />
      </Router>
    );
    const submit = getByTestId("activity-submit");
    expect(submit).toBeDisabled();
  });

  it("Checks if submit button form is enabled with valid input", () => {
    const { getByTestId } = render(
      <Router>
        <CreateActivity />
      </Router>
    );
    const submit = getByTestId("activity-submit");
    const activtyName = getByTestId("activity-name");
    const activityType = getByTestId("activity-type");
    const activityPrice = getByTestId("activity-price");
    const activityDescription = getByTestId("activity-description");
    // const activityCapacity = getByTestId("activity-capacity");
    // const activityDate = getByTestId("activity-date");

    fireEvent.change(activtyName, { target: { value: "Hiking" } });
    fireEvent.change(activityType, { target: { value: "Outdoors" } });
    fireEvent.change(activityPrice, { target: { value: 30 } });
    fireEvent.change(activityDescription, {
      target: { value: "Going hiking across the mountains" },
    });
    // fireEvent.change(activityCapacity, { target: { value: 40 } });
    // fireEvent.change(activityDate, { target: { value: "2022-09-13T14:00:00.000+00:00" } });
    expect(submit).not.toBeDisabled();
  });
});
