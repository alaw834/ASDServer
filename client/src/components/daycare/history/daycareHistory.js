import React, { createContext, useEffect, useState } from "react";
import Moment from 'moment';

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { Link, useNavigate, NavLink } from "react-router-dom";




// Here, we display our Navbar
export default function DaycareHistory(props) {

    const [currentDaycareBookingList, setcurrentDaycareBookingList] = useState([]);
    const DaycareBookingContext = createContext({});

    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:5000/daycareBooking/listAllDaycareBooking`);

            if (!response.ok) {
                const message = `An error occured: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setcurrentDaycareBookingList(records);
        }

        getRecords();
        console.log(currentDaycareBookingList);

        return;
    }, [currentDaycareBookingList.length]);

    const [currentDaycareBooking, setCurrentDaycareBooking] = useState(currentDaycareBookingList[0]);


    async function deleteBooking(item) {
        if (window.confirm("Are you sure you want to delete Daycare Booking " + item._id + " ?")) {
            await fetch(`http://localhost:5000/daycareBooking/delete/${item._id}`, {
                method: "DELETE"
            });
            alert("Daycare Booking " + item._id + " has been deleted.");
            window.location.reload();
        }
        else {
            alert("Daycare Booking " + item._id + " has not been deleted.")
        }
    }


    return (
        <div>
            <DaycareBookingContext.Provider
                value={{
                    currentDaycareBooking,
                    setCurrentDaycareBooking,
                    currentDaycareBookingList,
                    setcurrentDaycareBookingList
                }}
            >
                {props.children}
            </DaycareBookingContext.Provider>
            <div className="container">
                <NavLink className="nav-link" to="/components/daycare">
                    <button className="btn btn-outline-secondary mt-4">Back</button>

                </NavLink>

                <h1>My daycare history</h1>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Booking number</th>
                            <th scope="col">Daycare service</th>
                            <th scope="col">Number of children</th>
                            <th scope="col">Date</th>
                            <th scope="col">Time</th>
                            <th scope="col">Cost</th>
                            <th scope="col">Status</th>
                            <th scope="col">Payment</th>
                            <th scope="col">Location</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {React.Children.toArray(currentDaycareBookingList.map(d => {
                            return (
                                <tr >
                                    <th scope="row">{d._id}</th>
                                    <td>{d.daycareId}</td>
                                    <td>{d.numberChildren}</td>
                                    <td>{Moment(new Date(d.dcDate)).format('MM/DD/YYYY')}</td>
                                    <td>{d.dcTime}</td>
                                    <td>{d.dcCost}</td>
                                    <td>{d.dcBookingStatus}</td>
                                    <td>{d.isDcPaid}</td>
                                    <td>{d.dcLocation}</td>
                                    <td><Link to={'/components/daycare/history/edit/' + d._id}><button className="btn btn-secondary">Edit</button></Link>
                                        <button className="btn btn-secondary"><a onClick={() => { deleteBooking(d) }}>Delete</a></button>
                                    </td>



                                </tr>
                            )
                        }))}
                    </tbody>

                </table>

            </div>


        </div>
    );
}
