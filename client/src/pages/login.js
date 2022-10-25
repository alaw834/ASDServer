import React, { useState, useEffect } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router";


export default function Auth() {
    const [validated, setValidated] = useState(false);


    const [form, setForm] = useState({
        emailAddress: "",
        password: "",
    });

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }
    const navigate = useNavigate();

    async function login(e) {
        const form2 = e.currentTarget;

        if (form2.checkValidity() === false) {
            console.log("something wrong")
            e.preventDefault();
            e.stopPropagation();
        }


        setValidated(true);
        if (setValidated) {
            const newUser = {
                emailAddress: form.emailAddress,
                password: form.password,
            };

            const response =
                await fetch('http://localhost:5000/admin/loginUser', {
                    method: "POST",
                    body: JSON.stringify(newUser),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
                );
            // console.log(JSON.stringify(newUser))
            // console.log("this is calling the user")
            if (!response.ok) {
                // console.log("something is very wrong")
                const message = await response.json();
                console.log(message.message)
                window.alert(`An error occurred: ${message.message}`);
                return;
            }
            const message = await response.json();
            console.log(message.message)
            window.alert(message.message);
            // Get this working with session for R2
            navigate(`/components/accounts/${message.id}`,
                {
                    userId: message.id
                });
        }
    }

    return (
        <div className="Auth-form-container">
            <Form noValidate validated={validated} className="Auth-form" onSubmit={login}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Login</h3>
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
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                        <a href='./forgotPassword'>
                            Forgot your password?
                        </a>
                        <a href='./register'>
                            Register here!
                        </a>
                    </div>
                </div>
            </Form>
            <div className="d-grid gap-2 mt-3">
            </div>
        </div>
    )
}