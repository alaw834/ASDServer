import React from "react";
import Auth from "./login/auth"

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// Here, we display our Navbar
export default function CustomerLogin() {
    return (
        <div>
            <h1>Admin</h1>
            <h2>Login Here</h2>
            <Auth />
        </div>
    );
}