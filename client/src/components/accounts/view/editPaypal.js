import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function EditPaypal() {
    const [form, setForm] = useState({
        paypalUsername: "",
        records: [],
    });

    const [errors] = useState({
        paypalUsernameError: ""
    });

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5000/paypal/list/${params.id.toString()}`);
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
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const editedPaypal = {
            paypalUsername: form.paypalUsername,
        };

        // This will send a post request to update the data in the database.
        await fetch(`http://localhost:5000/paypal/update/${params.id}`, {
            method: "PATCH",
            body: JSON.stringify(editedPaypal),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        navigate("/");
    }

    function handleValidation() {
        let formIsValid = true;

        if (!form.paypalUsername) {
            formIsValid = false;
            errors.paypalUsernameError = "Cannot be empty";
        }
        else if (!form.paypalUsername.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            formIsValid = false;
            errors.paypalUsernameError = "Double Check Email Format";
        }
        else {
            errors.paypalUsernameError = "";
        }
        return formIsValid;
    }

    // This following section will display the form that takes input from the user to update the data.
    return (
        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
            <h3>Update Paypal</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group p-1">
                    <label htmlFor="name">Paypal Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.paypalUsername}
                        onChange={(e) => updateForm({ paypalUsername: e.target.value })}
                    />
                    <span style={{ color: "red" }}>{errors.paypalUsernameError}</span>
                </div>
                <div className="form-group p-1">
                    {(() => {
                        switch (handleValidation()) {
                            case true: return <><input type="submit" value="Edit" className="btn btn-primary" /></>;
                            case false: return null;
                            default: return <button>Error</button>;
                        }
                    })()}
                </div>
            </form>
        </div>
    );
}