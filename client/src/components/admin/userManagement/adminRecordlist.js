import React, { useState, useEffect } from 'react'
// import { useTable } from 'react-table';
import Table from 'react-bootstrap/Table';
import { useParams, useNavigate, redirect } from "react-router";
import ToggleVisibility from './toggleVisibility';
import Moment from 'moment';


export default function AccountManagement() {
    const [users, setUsers] = useState([]);
    const [deletedUser, setDelete] = useState({
        _id: "",
    });
    const [editedUser, setEdit] = useState({
        _id: "",
    });



    function updateDelForm(value) {
        return setDelete((prev) => {
            // console.log(value)
            // console.log(deletedUser._id)
            return { ...prev, ...value };
        });
    }
    function updateEditForm(value) {
        return setEdit((prev) => {
            // console.log(value)
            // console.log(deletedUser._id)
            return { ...prev, ...value };
        });
    }

    // This method fetches the users from the database.
    useEffect(() => {
        async function getUsers() {
            // const { itemId, otherParam } = route.params;
            const response = await fetch('http://localhost:5000/user/listAll');
            if (!response.ok) {
                console.log("error")
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const users = await response.json();
            setUsers(users);
        }
        getUsers();
    }, [users.length]);

    // let id = deletedUser._id
    // This method will delete a user
    async function handleDelete(id) {
        const deleteMe = {
            id: deletedUser._id
        }
        console.log(id)
        console.log(deleteMe.id)

        const response = await fetch(`http://localhost:5000/admin/delete/${id}`, {
            method: "DELETE",
            body: JSON.stringify(deleteMe),
            headers: {
                'Content-Type': 'application/json'
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
            const newDelete = deletedUser.filter((el) => el._id !== id);
            setDelete(newDelete);
        }
    }

    // async function handleEdit(id) {
    //     const editMe = {
    //         id: editedUser._id
    //     }
    //     console.log(id)
    //     console.log(editMe.id)

    //     await fetch(`http://localhost:5000/admin/update/${id}`, {
    //         method: "PATCH",
    //         body: JSON.stringify(editMe),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //     });
    //     const newEdit = editedUser.filter((el) => el._id !== id);
    //     setDelete(newEdit);
    // }

    // This following section will display the table with the records of individuals.
    return (
        <div>
            <h1>User Records</h1>
            <ToggleVisibility>
                <a href={`./adminCreate`}><button className="btn btn-primary" type="button">Add User</button></a>
                <br />
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Edit User</h3>
                        <div className="form-group mt-3">
                            <input
                                name="editingUser"
                                type="text"
                                className="form-control mt-1"
                                placeholder="User ID"
                                value={editedUser._id}
                                onChange={(e) => updateEditForm({ _id: e.target.value })}
                            />
                            <div className="d-grid gap-2 mt-3">
                                <a href={`./adminEdit/${editedUser._id}`}><button className="btn btn-primary" type="button">Edit User</button></a>
                            </div>
                        </div>
                    </div>
                </form>
                <form className="Auth-form" onSubmit={handleDelete}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Delete User</h3>
                        <div className="form-group mt-3">
                            <input
                                name="deletingUser"
                                type="text"
                                className="form-control mt-1"
                                placeholder="User ID"
                                value={deletedUser._id}
                                onChange={(e) => updateDelForm({ _id: e.target.value })}
                            />
                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-primary">
                                    Delete User
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <br />
            </ToggleVisibility>
            <Table size="xl">
                <thead>
                    <tr>
                        <th>Pic</th>
                        <th>ID</th>
                        <th>Registration Date</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email Address</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>User Type</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((value, key) => {
                            return (
                                <tr key={key}>
                                    <td><img width="100px" src={value.profilePic} alt="profile pic"></img></td>
                                    <td>{value._id}</td>
                                    <td>{Moment(new Date(value.registeredDate)).format('MM/DD/YYYY')}</td>
                                    <td>{value.firstName}</td>
                                    <td>{value.lastName}</td>
                                    <td>{value.emailAddress}</td>
                                    <td>{value.phoneNumber}</td>
                                    <td>{value.streetNumber} {value.streetName}, {value.postcode}</td>
                                    <td>{value.userType} </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div >
    );
}