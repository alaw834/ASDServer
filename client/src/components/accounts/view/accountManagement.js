import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, redirect } from "react-router";
import Moment from 'moment';

import "bootstrap/dist/css/bootstrap.css";
import "./style.css";

export default function AccountManagement() {
    const [users, setUsers] = useState([]);

    // This method fetches the users from the database.
    useEffect(() => {
        async function getUsers() {
            // const response = await fetch('http://localhost:5000/user/listAll');
            const response = await fetch('http://localhost:5000/user/listUser/633c34d023ae081c6cc3e203');
            if (!response.ok) {
                console.log("Error")
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const users = await response.json();
            setUsers(users);
        }
        getUsers();
        return;
    }, [users.length]);


    // This method will delete a user
    async function deleteUser(id) {
        await fetch(`http://localhost:5000/user/delete/${id}`, {
            method: "DELETE"
        });

        const newUsers = users.filter((el) => el._id !== id);
        setUsers(newUsers);
    }

    // This following section will display the table with the users of individuals.
    return (
        <>
            <div class="d-inline-flex p-2 row">
                <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                    <h4>Your Profile</h4>
                    <img
                        class="rounded-circle mt-2"
                        width="150px"
                        src={users.profilePic}
                        alt="Profile Pic"
                    ></img>
                    <span class="font-weight-bold">
                        {users.firstName} {users.lastName}
                    </span>
                    <span class="text-black-50">{users.emailAddress}</span>
                    <div class="row mt-3 col-md-12">
                        <label class="labels">
                            Address Line 1: {users.streetNumber} {users.streetName},{" "}
                            {users.postcode}
                        </label>
                        <label class="labels">Phone Number: {users.phoneNumber}</label>
                        <label class="labels">DoB: {Moment(new Date(users.dob)).format('MM/DD/YYYY')}</label>
                    </div>
                    <div class="btn-toolbar align-items-center text-center">
                        <a href={`./edit/${users._id}`}>
                            <button class="btn btn-primary btn-sm m-3" type="button">
                                Edit User
                            </button>
                        </a>
                        <a href={`./payments/${users._id}`}>
                            <button class="btn btn-primary btn-sm m-3" type="button">
                                Payment Options
                            </button>
                        </a>
                        <button
                            class="btn btn-primary btn-sm m-3"
                            type="button"
                            onClick={() => {
                                deleteUser(users._id);
                            }}
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
