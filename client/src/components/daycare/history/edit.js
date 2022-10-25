import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import "bootstrap/dist/css/bootstrap.css";


export default function Edit() {
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:5000/daycareBooking/listOneDaycareBooking/${params.id.toString()}`);

            if (!response.ok) {
                const message = `An error occured: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setForm(records);
        }
        getRecords();
        return;

    },[params.id, navigate])

    const [form, setForm] = useState({
        bookingId: "",
        daycareId: "",
        numberChildren: "",
        dcDate: "",
        dcTime: "",
        dcCost: "",
        dcBookingStatus: "",
        isDcPaid: "",
        dcLocation: ""

    });



    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const editedDaycareBooking = {
            _id : params.id,
            numberChildren: form.numberChildren,
            dcDate: form.dcDate,
            dcTime: form.dcTime,
            dcLocation: form.dcLocation
        };

        await fetch("http://localhost:5000/daycareBooking/update", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedDaycareBooking),
        });
        console.log("Daycare Booking updated");
        navigate("/components/daycare/history/daycareHistory");


    }

    function transformDate(date) {
        var nonformatted = new Date(date);
        var year = nonformatted.toLocaleString("default", { year: "numeric" });
        var month = nonformatted.toLocaleString("default", { month: "2-digit" });
        var day = nonformatted.toLocaleString("default", { day: "2-digit" });
        var formattedDate = year + "-" + month + "-" + day;
        return formattedDate;
    }

    // This following section will display the form that takes input from the user to update the data.
    return (
        <div>
            <div className="container p-4">
                <h3>Update Daycare Booking</h3>
                <form onSubmit={onSubmit} className="needs-validation">
                    <div className="form-group m-3">
                        <label htmlFor="bookingId" className="mb-2">Booking number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="bookingId"
                            value={form._id}
                            onChange={(e) => updateForm({ id: e.target.value })}
                            readOnly
                        />
                    </div>
                    <div className="form-group m-3">
                        <label htmlFor="daycareService" className="mb-2">Daycare Service </label>
                        <input
                            type="text"
                            className="form-control"
                            id="daycareID"
                            value={form.daycareId}
                            onChange={(e) => updateForm({ daycareId: e.target.value })}
                            readOnly
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
                            value={transformDate(form.dcDate)}
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
                            value={form.dcCost}
                            onChange={(e) => updateForm({ cost: e.target.value })}
                            readOnly
                        />
                    </div>

                    <div className="form-group m-3">
                        <label htmlFor="dcBookingStatus" className="mb-2">Booking Status </label>
                        <input
                            type="text"
                            className="form-control"
                            id="dcBookingStatus"
                            value={form.dcBookingStatus}
                            onChange={(e) => updateForm({ dcBookingStatus: e.target.value })}
                            readOnly
                        />
                    </div>
                    <div className="form-group m-3">
                        <label htmlFor="isDcPaid" className="mb-2">Payment</label>
                        <input
                            type="text"
                            className="form-control"
                            id="daycareID"
                            value={form.isDcPaid}
                            onChange={(e) => updateForm({ isDcPaid: e.target.value })}
                            readOnly
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
                        />
                    </div>

                    <br />

                    <div className="form-group">
                        <input
                            type="submit"
                            value="Update Record"
                            className="btn btn-primary"
                        />
                    </div>
                    <button className="btn btn-outline-secondary mt-4" onClick={() => navigate(-1)}>Cancel</button>

                </form>
            </div>
        </div>
    );
}