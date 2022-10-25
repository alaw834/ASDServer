import React, { useState } from "react";
import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.css";
import { handleValidation } from "../daycareTestRunner";

export default function Create() {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        id: "",
        daycareName: "",
        daycareType: "",
        daycareDescription: "",
        daycareCapacity: 0,
        daycarePrice: 0,
    });
    // These methods will update the state properties.
    function updateForm(value) {
        handleValidation(
            form.daycareName,
            form.daycareType,
            form.daycareDescription,
            form.daycareCapacity,
            form.daycarePrice,
        );

        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newDaycare = { ...form };

        await fetch("http://localhost:5000/daycare/addDaycare", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newDaycare),
        })
            .catch(error => {
                window.alert(error);
                return;
            });
        console.log("New daycare created")

        setForm({
            daycareID: "",
            daycareName: "",
            daycareType: "",
            daycareDescription: "",
            daycareCapacity: "",
            daycarePrice: "",
        });
        navigate('/components/daycare',
            {
                state:
                {
                    id: "",
                    daycareName: e.daycareName,
                    daycareType: e.typeOptions,
                    daycareDescription: e.daycareDescription,
                    daycarePrice: e.daycarePrice,
                    daycareCapacity: e.daycareCapacity,
                }
            })

    }

    // This following section will display the form that takes the input from the user.
    return (
        <div className="container p-4">
            <h3>Create New Daycare Service</h3>
            <form onSubmit={onSubmit} className="needs-validation">
                <div className="form-group m-3">
                    <label htmlFor="name" className="mb-2">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="daycareName"
                        value={form.daycareName}
                        placeholder="Enter daycare service name"
                        onChange={(e) => updateForm({ daycareName: e.target.value })}
                        required
                    />

                </div>

                <div className="form-group m-3">
                    <label htmlFor="type" className="mb-2">Type</label><br />

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="typeOptions"
                            id="typeOptions"
                            value="Care Centre"
                            onChange={(e) => updateForm({ daycareType: e.target.value })}
                            required
                        />
                        <label htmlFor="typeCareCentre" className="form-check-label">Care Centre</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="typeOptions"
                            id="typeOptions"
                            value="In room"
                            onChange={(e) => updateForm({ daycareType: e.target.value })}
                        />
                        <label htmlFor="typeInroom" className="form-check-label">In room</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="typeOptions"
                            id="typeOptions"
                            value="Excursion"
                            onChange={(e) => updateForm({ daycareType: e.target.value })}
                        />
                        <label htmlFor="typeExcursion" className="form-check-label">Excursion</label>
                    </div>
                </div>
                <div className="form-group m-3">
                    <label htmlFor="capacity" className="mb-2">Capacity</label>
                    <input
                        type="number"
                        className="form-control"
                        id="daycareCapacity"
                        value={form.daycareCapacity}
                        onChange={(e) => updateForm({ daycareCapacity: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group m-3">
                    <label htmlFor="price" className="mb-2">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="daycarePrice"
                        value={form.daycarePrice}
                        onChange={(e) => updateForm({ daycarePrice: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group m-3">
                    <label htmlFor="description" className="mb-2">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="daycareDescription"
                        value={form.daycareDescription}
                        placeholder="Enter brief service description"
                        onChange={(e) => updateForm({ daycareDescription: e.target.value })}
                    />
                </div>

                <div className="col">



                    {(() => {
                        switch (handleValidation(
                            form.daycareName,
                            form.daycareType,
                            form.daycareDescription,
                            form.daycareCapacity,
                            form.daycarePrice,
                        )) {
                            case true: return <><input
                                type="submit"
                                value="Create daycare"
                                className="btn btn-primary"

                            /></>;
                            case false: return <>
                                <input
                                    type="submit"
                                    value="Create daycare"
                                    className="btn btn-primary"
                                    disabled
                                />
                            </>;
                            default: return <>
                                <input
                                    type="submit"
                                    value="Create daycare"
                                    className="btn btn-primary"

                                />
                            </>
                        }
                    })()}
                </div>
                <button className="btn btn-outline-secondary mt-4" onClick={() => navigate(-1)}>Cancel</button>
            </form>
            <div>
            </div>

        </div>
    );
}