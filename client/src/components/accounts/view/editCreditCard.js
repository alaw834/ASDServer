import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function EditAccount() {
    const [form, setForm] = useState({
        cardNumber: "",
        expiryDate: "",
        holderName: "",
        cvv: "",
        records: [],
    });

    const [errors] = useState({
        cardNumberError: "",
        expiryDateError: "",
        holderNameError: "",
        cvvError: ""
    });

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5000/creditcard/list/${params.id.toString()}`);
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
        const editedCard = {
            cardNumber: form.cardNumber,
            expiryDate: form.expiryDate,
            holderName: form.holderName,
            cvv: form.cvv,
        };

        // This will send a post request to update the data in the database.
        await fetch(`http://localhost:5000/creditcard/update/${params.id}`, {
            method: "PATCH",
            body: JSON.stringify(editedCard),
            headers: {
                'Content-Type': 'application/json'
            },
        });
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

    // This following section will display the form that takes input from the user to update the data.
    return (
        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
            <h3>Update Credit Card</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group p-1">
                    <label htmlFor="name">Card Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.cardNumber}
                        onChange={(e) => updateForm({ cardNumber: e.target.value })}
                    />
                    <span style={{ color: "red" }}>{errors.cardNumberError}</span>
                </div>
                <div className="form-group p-1">
                    <label htmlFor="position">Expiry Date</label>
                    <input
                        type="text"
                        className="form-control"
                        id="position"
                        value={form.expiryDate}
                        onChange={(e) => updateForm({ expiryDate: e.target.value })}
                    />
                    <span style={{ color: "red" }}>{errors.expiryDateError}</span>
                </div>
                <div className="form-group p-1">
                    <label htmlFor="position">Holder Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="position"
                        value={form.holderName}
                        onChange={(e) => updateForm({ holderName: e.target.value })}
                    />
                    <span style={{ color: "red" }}>{errors.holderNameError}</span>
                </div>
                <div className="form-group p-1">
                    <label htmlFor="position">CVV</label>
                    <input
                        type="text"
                        className="form-control"
                        id="position"
                        value={form.cvv}
                        onChange={(e) => updateForm({ cvv: e.target.value })}
                    />
                    <span style={{ color: "red" }}>{errors.cvvError}</span>
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