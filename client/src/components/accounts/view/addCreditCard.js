import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function CreateCreditCard() {
    const [form, setForm] = useState({
        cardNumber: "",
        expiryDate: "",
        holderName: "",
        cvv: "",
    });

    const [errors] = useState({
        cardNumberError: "",
        expiryDateError: "",
        holderNameError: "",
        cvvError: ""
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
        const newCC = { ...form };

        await fetch(`http://localhost:5000/creditcard/add/${params.id.toString()}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCC),
        })
            .catch(error => {
                window.alert(error);
                return;
            });

        setForm({ cardNumber: "", expiryDate: "", holderName: "", cvv: "" });
        navigate("/");
    }

    function handleValidation() {
        let formIsValid = true;

        if (!form.cardNumber) {
            formIsValid = false;
            errors.cardNumberError = "Cannot be empty";
        }
        else {
            errors.cardNumberError = "";
        }

        if (!form.expiryDate) {
            formIsValid = false;
            errors.expiryDateError = "Cannot be empty";
        }
        else if (!form.expiryDate.match(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/)) {
            formIsValid = false;
            errors.expiryDateError = "Please enter date format (MM/YY) or (MM/YYYY)";
        }
        else {
            errors.expiryDateError = "";
        }

        if (!form.holderName) {
            formIsValid = false;
            errors.holderNameError = "Cannot be empty";
        }
        else if (!form.holderName.match(/^[a-z ,.'-]+$/i)) {
            formIsValid = false;
            errors.holderNameError = "Only letters";
        }
        else {
            errors.holderNameError = "";
        }

        if (!form.cvv) {
            formIsValid = false;
            errors.cvvError = "Cannot be empty";
        }
        else {
            errors.cvvError = "";
        }

        if (formIsValid == true) {
            errors.emailAddressError = "";
            errors.dobError = "";
        }
        return formIsValid;
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
            <h3>Add Credit Card</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group p-1">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cardNumber"
                        value={form.cardNumber}
                        onChange={(e) => updateForm({ cardNumber: e.target.value })}
                    />
                    <span style={{ color: "red" }}>{errors.cardNumberError}</span>
                </div>
                <div className="form-group p-1">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input
                        type="text"
                        className="form-control"
                        id="expiryDate"
                        value={form.expiryDate}
                        onChange={(e) => updateForm({ expiryDate: e.target.value })}
                    />
                    <span style={{ color: "red" }}>{errors.expiryDateError}</span>
                </div>
                <div className="form-group p-1">
                    <label htmlFor="holderName">Holder Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="holderName"
                        value={form.holderName}
                        onChange={(e) => updateForm({ holderName: e.target.value })}
                    />
                    <span style={{ color: "red" }}>{errors.holderNameError}</span>
                </div>
                <div className="form-group p-1">
                    <label htmlFor="cvv">CVV</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cvv"
                        value={form.cvv}
                        onChange={(e) => updateForm({ cvv: e.target.value })}
                    />
                    <span style={{ color: "red" }}>{errors.cvvError}</span>
                </div>
                <div className="form-group p-1">
                    {(() => {
                        switch (handleValidation()) {
                            case true: return <><input type="submit" value="Add Credit Card" className="btn btn-primary" /></>;
                            case false: return null;
                            default: return <button>Error</button>;
                        }
                    })()}
                </div>
            </form>
        </div>
    );
}