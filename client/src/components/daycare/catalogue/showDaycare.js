import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { useLocation, useNavigate, NavLink, Link } from "react-router-dom";

// Here, we display our Navbar

export default function ShowDaycare() {
    var location = useLocation();
    let navigate = useNavigate();


    return (
        <div className="container">
            <button className="btn btn-outline-secondary mt-4" onClick={() => navigate(-1)}>Back</button>

            <div className="row mb-5">
                <div className="col">
                    <h1 className="text-center">{location.state.name}</h1>
                </div>
            </div>
            <div className="row m-5 align-items-center">
                <div className="col p-2 ">
                    <div className="row mb-3">
                        <p><b>Service type:</b> {location.state.type}</p>
                        <p><b>Service capacity:</b> {location.state.capacity}</p>
                        <p><b>Service price:</b> ${location.state.price} per hour</p>
                        <p><b>Service description:</b> {location.state.description}</p>
                    </div>
                    <div className="row mt-3">
                        <Link to={'/components/daycare/history/create/' + location.state.id}><button className="btn btn-secondary btn-lg btn-block">Book</button></Link>

                    </div>
                </div>
                <div className="col">
                    <img src={location.state.img} className="rounded mx-auto d-block" width="400"></img>
                </div>

            </div>

        </div >
    );
}

