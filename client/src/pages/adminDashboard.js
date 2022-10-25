import React from "react";
import AdminRecordList from "../components/admin/userManagement/adminRecordlist";
//import AdminCreate from "./users/adminCreate"

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// Here, we display our Navbar
export default function AdminDashboard() {
    return (
        <div>
            <h1>Admin</h1>
            <AdminRecordList />
            {/*Dashboard Code with list of users and incoming deactiveate requests or smth*/}
            {/*If the current logged in user is the admin, the navbar will change and they'll be able to see this page as a tab in the navbar*/}
            {/*Regular staff that are logged in won't be able to see this in the navbar*/}
        </div >
    );
}