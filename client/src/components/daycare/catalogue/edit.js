import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.css";
import { handleValidation } from "../daycareTestRunner";


export default function Edit() {

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:5000/daycare/listOneDaycare/${params.id.toString()}`);

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
    }, [params.id, navigate])


    const [form, setForm] = useState({
        daycareId: "",
        daycareName: "",
        daycareType: "",
        ddaycareDescription: "",
        daycareCapacity: "",
        daycarePrice: "",
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

    async function onSubmit(e) {
        e.preventDefault();
        const editedDaycare = {
            _id: params.id,
            daycareName: form.daycareName,
            daycareType: form.daycareType,
            daycareDescription: form.daycareDescription,
            daycareCapacity: form.daycareCapacity,
            daycarePrice: form.daycarePrice,
        };
        await fetch("http://localhost:5000/daycare/update", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedDaycare),
        });
        if (handleValidation(form.daycareName,
            form.daycareType,
            form.daycareDescription,
            form.daycareCapacity,
            form.daycarePrice,) == true) {
            console.log("Daycare updated");
        }


        navigate("/components/daycare");

    }

    // This following section will display the form that takes input from the user to update the data.
    return (
        <div className="container p-4">
            <h3>Update Daycare Service</h3>
            <form onSubmit={onSubmit} className="needs-validation">
                <div className="form-group m-3">
                    <label htmlFor="id" className="mb-2">Daycare ID </label>
                    <input
                        type="text"
                        className="form-control"
                        id="id"
                        value={form._id}
                        onChange={(e) => updateForm({ id: e.target.value })}
                        readOnly
                    />
                </div>
                <div className="form-group m-3">
                    <label htmlFor="name" className="mb-2">Daycare name </label>
                    <input
                        type="text"
                        className="form-control"
                        id="daycareName"
                        value={form.daycareName}
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
                            checked={form.daycareType === "Care Centre"}
                            onChange={(e) => updateForm({ daycareType: e.target.value })}
                        />
                        <label htmlFor="typeCareCentre" className="form-check-label">Care Centre</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="typeOptions"
                            id="typeoptions"
                            value="In room"
                            checked={form.daycareType === "In room"}
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
                            checked={form.daycareType === "Excursion"}
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
                    />
                </div>
                <div className="form-group m-3">
                    <label htmlFor="description" className="mb-2">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="daycareDescription"
                        value={form.daycareDescription}
                        onChange={(e) => updateForm({ daycareDescription: e.target.value })}
                    />
                </div>
                <br />
                <div>
                    {(() => {
                        switch (handleValidation(
                            form.daycareName,
                            form.daycareType,
                            form.daycareDescription,
                            form.daycareCapacity,
                            form.daycarePrice,
                        )) {
                            case true: return <>
                                <input
                                    type="submit"
                                    value="Update Record"
                                    className="btn btn-primary"
                                />
                            </>;
                            case false: return <>
                                <input
                                    type="submit"
                                    value="Update Record"
                                    className="btn btn-primary"
                                    disabled
                                />
                            </>;
                            default: return <>
                                <input
                                    type="submit"
                                    value="Update Record"
                                    className="btn btn-primary"
                                />
                            </>

                        }
                    })()}
                </div>
                <button className="btn btn-outline-secondary mt-4" onClick={() => navigate(-1)}>Cancel</button>


            </form>
        </div>
    );
}