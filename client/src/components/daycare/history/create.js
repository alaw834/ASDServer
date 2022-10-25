import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "bootstrap/dist/css/bootstrap.css";

export default function Create() {

    const navigate = useNavigate();
    const params = useParams();
    const [selectedDaycare, setSelectedDaycare] = useState({});
    useEffect(() => {
        async function getDaycare() {
            const response = await fetch(`http://localhost:5000/daycare/listOneDaycare/${params.id.toString()}`);

            if (!response.ok) {
                const message = `An error occured: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setSelectedDaycare(records);
        }
        getDaycare();
        return;
    }, [params.id, navigate])



    const [form, setForm] = useState({
        id: "",
        numberChildren: "",
        dcDate: "",
        dcTime: "",
        dcCost: "",
        dcBookingStatus: "",
        isDcPaid: "",
        dcLocation: "",
        daycareId: "",
        customerId: "",
    });

    //preset some attributes
    form.daycareId = selectedDaycare._id;
    form.dcBookingStatus = "Upcoming";
    form.isDcPaid = false;
    form.dcCost = selectedDaycare.daycarePrice * form.numberChildren;
    if (selectedDaycare.daycareType === "Care Centre") {
        form.dcLocation = selectedDaycare.daycareName;
    }
    else {
        form.dcLocation = "Client room"
    }

    console.log(form);
    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newDaycareBooking = { ...form };

        await fetch("http://localhost:5000/daycareBooking/addDaycareBooking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newDaycareBooking),
        })
            .catch(error => {
                window.alert(error);
                return;
            });
        console.log("New daycare booking created")
        form.dcCost = selectedDaycare.daycarePrice * form.numberChildren;

        setForm({
            bookingId: "",
            numberChildren: "",
            dcDate: "",
            dcTime: "",
            dcCost: "",
            dcBookingStatus: "",
            isDcPaid: "",
            dcLocation: "",
            daycareId: "",
            customerId: "",
        });
        navigate('/components/daycare',
            {
                state:
                {
                    id: "",
                    numberChildren: e.numberChildren,
                    dcDate: e.dcDate,
                    dcTime: e.timeOptions,
                    dcCost: e.dcCost,
                    dcBookingStatus: e.dcBookingStatus,
                    isDcPaid: e.isDcPaid,
                    dcLocation: e.dcLocation,
                    daycareId: e.daycareId,
                    customerId: e.customerId,
                }
            })

    }

    // This following section will display the form that takes the input from the user.
    return (
        <div className="container p-4">
            <h3>Create new booking</h3>
            <form onSubmit={onSubmit} className="needs-validation">
                <div className="form-group m-3">
                    <label htmlFor="name" className="mb-2">Daycare</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={selectedDaycare.daycareName}
                        onChange={(e) => updateForm({ daycareName: e.target.value })}
                        required
                        disabled
                    />

                </div>
                <div className="form-group m-3">
                    <label htmlFor="customerId" className="mb-2">Customer ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="customerId"
                        value={form.customerId}
                        onChange={(e) => updateForm({ customerId: e.target.value })}
                        required

                    />

                </div>
                <div className="form-group m-3">
                    <label htmlFor="numberChildren" className="mb-2">Number of children</label>
                    <input
                        type="number"
                        className="form-control"
                        id="numberChildren"
                        value={form.numberChildren}
                        onChange={(e) => updateForm({ numberChildren: e.target.value })}
                    />
                </div>

                <div className="form-group m-3">
                    <label htmlFor="dcDate" className="mb-2">Booking Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="dcDate"
                        value={form.dcDate}
                        onChange={(e) => updateForm({ dcDate: e.target.value })}
                    />
                </div>

                <div className="form-group m-3">
                    <label htmlFor="type" className="mb-2">Booking time</label><br />
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="timeOptions"
                            id="timeOptions"
                            value="Full day"
                            checked={form.dcTime === "Full day"}
                            onChange={(e) => updateForm({ dcTime: e.target.value })}
                        />
                        <label htmlFor="dcTimeFullday" className="form-check-label">Full day</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="timeOptions"
                            id="timeOptions"
                            value="Morning"
                            checked={form.dcTime === "Morning"}
                            onChange={(e) => updateForm({ dcTime: e.target.value })}
                        />
                        <label htmlFor="dcTimeMorning" className="form-check-label">Morning</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="timeOptions"
                            id="timeOptions"
                            value="Afternoon"
                            checked={form.dcTime === "Afternoon"}
                            onChange={(e) => updateForm({ dcTime: e.target.value })}
                        />
                        <label htmlFor="dcTimeAfternoon" className="form-check-label">Afternoon</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="timeOptions"
                            id="timeOptions"
                            value="Night"
                            checked={form.dcTime === "Night"}
                            onChange={(e) => updateForm({ dcTime: e.target.value })}
                        />
                        <label htmlFor="dcTimeNight" className="form-check-label">Night</label>
                    </div>
                </div>

                <div className="form-group m-3">
                    <label htmlFor="dcCost" className="mb-2">Cost</label>
                    <input
                        type="number"
                        className="form-control"
                        id="dcCost"
                        value={selectedDaycare.daycarePrice * form.numberChildren}
                        onChange={(e) => updateForm({ dcCost: e.target.value })}

                        disabled
                    />
                </div>

                <div className="form-group m-3">
                    <label htmlFor="dcLocation" className="mb-2">Location</label>
                    <input
                        type="text"
                        className="form-control"
                        id="dcLocation"
                        value={form.dcLocation}
                        onChange={(e) => updateForm({ dcLocation: e.target.value })}
                        disabled
                    />
                </div>

                <div className="form-group">
                    <input
                        type="submit"
                        value="Create daycare"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}