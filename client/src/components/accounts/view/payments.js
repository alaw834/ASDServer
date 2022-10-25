import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { useParams } from "react-router";

export default function Payments() {
    const [paymentOptions, setUsers] = useState([]);
    const [creditCard, setCC] = useState([]);
    const [payPal, setPaypal] = useState([]);
    const params = useParams();

    // This method fetches the users from the database.
    useEffect(() => {
        async function getUsers() {
            const response = await fetch(`http://localhost:5000/paymentOption/list/${params.id.toString()}`);
            if (!response.ok) {
                console.log("Error")
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const paymentOptions = await response.json();
            setUsers(paymentOptions);
        }
        async function getCC() {
            const response = await fetch(`http://localhost:5000/creditcard/listall/${params.id.toString()}`);
            if (!response.ok) {
                console.log("Error")
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const creditCard = await response.json();
            setCC(creditCard);
        }
        async function getPaypal() {
            const response = await fetch(`http://localhost:5000/paypal/listall/${params.id.toString()}`);
            if (!response.ok) {
                console.log("Error")
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const payPal = await response.json();
            setPaypal(payPal);
        }
        getUsers();
        getCC()
        getPaypal()
        return;
    });

    // This method will delete a user
    async function deletePaypal(id) {
        await fetch(`http://localhost:5000/paypal/delete/${id}`, {
            method: "DELETE"
        });

        const newOptions = paymentOptions.filter((el) => el._id !== id);
        setUsers(newOptions);
    }

    async function deleteCC(id) {
        await fetch(`http://localhost:5000/creditcard/delete/${id}`, {
            method: "DELETE"
        });

        const newOptions = paymentOptions.filter((el) => el._id !== id);
        setUsers(newOptions);
    }

    // This following section will display the table with the users of individuals.
    return (
        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
            <div class="py-3">
                <h3>Linked Payments</h3>
            </div>
            <h5>Credit Cards</h5>
            <Table size="xl">
                <thead>
                    <tr>
                        <th>Card Number</th>
                        <th>Expiry Date</th>
                        <th>Holder Name</th>
                        <th>Edit</th>
                        <th>Unlink</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        creditCard.map((value, key) => {
                            return (
                                <tr key={key}>
                                    <td>{value.cardNumber}</td>
                                    <td>{value.expiryDate}</td>
                                    <td>{value.holderName}</td>
                                    <td><a href={`./editCreditCard/${value._id}`}><button class="btn btn-primary btn-sm m-2" type="button">Edit</button></a></td>
                                    <td><button class="btn btn-primary btn-sm m-2" type="button" onClick={() => { deleteCC(value._id); }}>Unlink</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <h5>Paypal</h5>
            <Table size="xl">
                <thead>
                    <tr>
                        <th>Paypal Account</th>
                        <th>Edit</th>
                        <th>Unlink</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        payPal.map((value, key) => {
                            return (
                                <tr key={key}>
                                    <td>{value.paypalUsername}</td>
                                    <td><a href={`./editpayPal/${value._id}`}><button class="btn btn-primary btn-sm m-2" type="button">Edit</button></a></td>
                                    <td><button class="btn btn-primary btn-sm m-2" type="button" onClick={() => { deletePaypal(value._id); }}>Unlink</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <div>
                <div>
                    <h5>Add Payment Options</h5>
                </div>
                <a href={`./addCreditCard/${params.id.toString()}`}><button class="btn btn-primary btn-sm m-2" type="button">Add Credit Card</button></a>
                <a href={`./addPaypal/${params.id.toString()}`}><button class="btn btn-primary btn-sm m-2" type="button">Add Paypal</button></a>
            </div>
        </div>
    );
}