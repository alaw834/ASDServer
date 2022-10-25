import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function CreatePaypal() {
    const [form, setForm] = useState({
        paypalUsername: "",
    });

    const [errors] = useState({
        paypalUsernameError: ""
    });

    const navigate = useNavigate();
    const params = useParams();

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
        const newPaypal = { ...form };

        await fetch(`http://localhost:5000/paypal/add/${params.id.toString()}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPaypal),
        })
            .catch(error => {
                window.alert(error);
                return;
            });

        setForm({ paypalUsername: ""});
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

    // This following section will display the form that takes the input from the user.
    return (
        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
            <h3>Add Paypal</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group p-1">
                    <label htmlFor="paypalUsername">Paypal Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="paypalUsername"
                        value={form.paypalUsername}
                        onChange={(e) => updateForm({ paypalUsername: e.target.value })}
                    />
                    <span style={{ color: "red" }}>{errors.paypalUsernameError}</span>
                </div>
                <div className="form-group p-1">
                     {(() => {
                        switch (handleValidation()) {
                            case true: return <><input type="submit" value="Add Paypal" className="btn btn-primary" /></>;
                            case false: return null;
                            default: return <button>Error</button>;
                        }
                    })()}
                </div>
            </form>
        </div>
    );
}