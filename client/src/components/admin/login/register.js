import React, { useState, useEffect } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router";


export default function Register() {
    const [validated, setValidated] = useState(false);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
        phoneNumber: "",
        dob: "",
        streetNumber: "",
        streetName: "",
        postcode: "",
    });

    const navigate = useNavigate();

    function updateForm(value) {
        return setForm((prev) => {
            console.log(prev)
            return { ...prev, ...value };
        });
    }
    async function addUser(e) {
        const form2 = e.currentTarget;

        if (form2.checkValidity() === false) {
            console.log("something wrong")
            e.preventDefault();
            e.stopPropagation();
        }

        setValidated(true);
        if (setValidated) {

            console.log("something good")
            const newUser = {
                firstName: form.firstName,
                lastName: form.lastName,
                emailAddress: form.emailAddress,
                password: form.password,
                phoneNumber: form.phoneNumber,
                dob: form.dob,
                streetNumber: form.streetNumber,
                streetName: form.streetName,
                postcode: form.postcode,
            };
            const response =
                await fetch('http://localhost:5000/user/addUser', {
                    method: "POST",
                    body: JSON.stringify(newUser),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
                );
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
                navigate(`/components/accounts/`,
                    {
                        userId: message.id
                    });
            }

        }


    }


    return (
        <div className="Auth-form-container">
            <Form noValidate validated={validated} className="Auth-form" onSubmit={addUser}>
                <h3 className="Auth-form-title">Register</h3>
                <Form.Group as={Col} md="15" controlId="validationCustom01">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        required
                        name="firstName"
                        type="text"
                        placeholder="First name"
                        value={form.firstName}
                        onChange={(e) => updateForm({ firstName: e.target.value })
                        }
                    />
                </Form.Group>
                <Form.Group as={Col} md="15" controlId="validationCustom01">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        required
                        name="lastName"
                        type="text"
                        placeholder="Last name"
                        value={form.LastName}
                        onChange={(e) => updateForm({ lastName: e.target.value })}
                    />
                </Form.Group>
                <Form.Group as={Col} md="15" controlId="validationCustom01">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        name="emailAddress"
                        type="email"
                        placeholder="Email Address"
                        value={form.emailAddress}
                        onChange={(e) => updateForm({ emailAddress: e.target.value })}
                        pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid email address
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="15" controlId="validationCustom01">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        name="emailAddress"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) => updateForm({ password: e.target.value })}
                    />
                </Form.Group>
                <Form.Group as={Col} md="15" controlId="validationCustom01">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        required
                        name="phoneNumber"
                        type="text"
                        placeholder="Phone number"
                        value={form.phoneNumber}
                        onChange={(e) => updateForm({ phoneNumber: e.target.value })}
                        pattern="(^1300\d{6}$)|(^1800|1900|1902\d{6}$)|(^0[2|3|7|8]{1}[0-9]{8}$)|(^13\d{4}$)|(^04\d{2,3}\d{6}$)"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid Australian phone number
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="15" controlId="validationCustom01">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                        required
                        name="dob"
                        type="date"
                        placeholder="DOB"
                        value={form.dob}
                        onChange={(e) => updateForm({ dob: e.target.value })}
                    />
                </Form.Group>
                <Form.Group as={Col} md="15" controlId="validationCustom01">
                    <Form.Label>Street Number</Form.Label>
                    <Form.Control
                        required
                        name="streetNumber"
                        type="number"
                        placeholder="Street number"
                        value={form.streetNumber}
                        onChange={(e) => updateForm({ streetNumber: e.target.value })}
                    />
                </Form.Group>
                <Form.Group as={Col} md="15" controlId="validationCustom01">
                    <Form.Label>Street Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="streetName"
                        placeholder="Street name"
                        value={form.streetName}
                        onChange={(e) => updateForm({ streetName: e.target.value })}
                    />
                </Form.Group>

                <Form.Group as={Col} md="15" controlId="validationCustom01">
                    <Form.Label>Postcode</Form.Label>
                    <Form.Control
                        required
                        name="postcode"
                        type="text"
                        placeholder="Postcode"
                        value={form.postcode}
                        onChange={(e) => updateForm({ postcode: e.target.value })}
                    />
                </Form.Group>
                <div className="d-grid gap-2 mt-3">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </Form >
            <div className="d-grid gap-2 mt-3">
            </div>
        </div >
    )
}