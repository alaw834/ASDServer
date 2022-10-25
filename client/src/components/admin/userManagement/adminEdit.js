import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function AdminEdit() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        emailAddress: "",
        phoneNumber: "",
        password: "",
        dob: "",
        streetNumber: "",
        streetName: "",
        postCode: "",
        userType: "",
        records: [],
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(
                `http://localhost:5000/user/listUser/${params.id.toString()}`
            );

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const record = await response.json();
            if (!record) {
                window.alert(`Record with id ${id} not found`);
                navigate("/");
                return;
            }

            setForm(record);
        }

        fetchData();

        return;
    }, [params.id, navigate]);

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            console.log(prev);
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const editedPerson = {
            firstName: form.firstName,
            lastName: form.lastName,
            emailAddress: form.emailAddress,
            phoneNumber: form.phoneNumber,
            password: form.password,
            dob: form.dob,
            streetNumber: form.streetNumber,
            streetName: form.streetName,
            postCode: form.postCode,
            userType: form.userType,
        };

        // This will send a post request to update the data in the database.
        const response = await fetch(`http://localhost:5000/admin/update/${params.id}`, {
            method: "PATCH",
            body: JSON.stringify(editedPerson),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            console.log("error")
            const message = await response.json()
            console.log(message.message)
            window.alert(message.message);
            return;
        }
        else {
            const message = await response.json();
            console.log(message.message)
            window.alert(message.message);
            navigate("/components/adminDashboard");
        }
    }

    // This following section will display the form that takes input from the user to update the data.
    return (
        <div>
            <h3>Update Record</h3>
            <form onSubmit={onSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Create User</h3>
                    <div className="form-group mt-3">
                        <label>First Name</label>
                        <input
                            name="firstName"
                            type="text"
                            className="form-control mt-1"
                            value={form.firstName}
                            onChange={(e) => updateForm({ firstName: e.target.value })
                            }
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Last Name</label>
                        <input
                            name="lastName"
                            type="text"
                            className="form-control mt-1"
                            value={form.LastName}
                            onChange={(e) => updateForm({ lastName: e.target.value })}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            name="emailAddress"
                            type="email"
                            className="form-control mt-1"
                            value={form.emailAddress}
                            onChange={(e) => updateForm({ emailAddress: e.target.value })}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            className="form-control mt-1"
                            value={form.password}
                            onChange={(e) => updateForm({ password: e.target.value })}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Phone Number</label>
                        <input
                            name="phoneNumber"
                            type="text"
                            className="form-control mt-1"
                            value={form.phoneNumber}
                            onChange={(e) => updateForm({ phoneNumber: e.target.value })}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Date of Birth</label>
                        <input
                            name="dob"
                            type="date"
                            className="form-control mt-1"
                            value={form.dob}
                            onChange={(e) => updateForm({ dob: e.target.value })}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Street Number</label>
                        <input
                            name="streetNumber"
                            type="number"
                            className="form-control mt-1"
                            value={form.streetNumber}
                            onChange={(e) => updateForm({ streetNumber: e.target.value })}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Street Name</label>
                        <input
                            name="streetName"
                            type="text"
                            className="form-control mt-1"
                            value={form.streetName}
                            onChange={(e) => updateForm({ streetName: e.target.value })}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Postcode</label>
                        <input
                            name="postcode"
                            type="text"
                            className="form-control mt-1"
                            value={form.postcode}
                            onChange={(e) => updateForm({ postcode: e.target.value })}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>User Type</label>
                        <br />
                        <select name="userType" type="text" className="form-control mt-1" value={form.userType} onChange={(e) => updateForm({ userType: e.target.value })}>
                            <option value="Customer">Customer</option>
                            <option value="Staff">Staff</option>
                            <option value="Admin">Admin</option>
                        </select>
                        {/* <input
                            name="userType"
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter email"
                            value={form.userType}
                            onChange={(e) => updateForm({ userType: e.target.value })}
                        /> */}
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
