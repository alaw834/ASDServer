import React, { useState } from "react";

export default function ToggleVisibility({ children }) {

    // React state to manage visibility
    const [show, setShow] = useState();

    // function to toggle the boolean value
    function toggleShow() {
        setShow(!show);
    }
    var buttonText = show ? "Done" : "Add, Edit, Delete";

    return (
        <div className="component-container">
            {show && children}
            <button class="btn btn-primary profile-button" type="button" onClick={toggleShow}>{buttonText}</button>
        </div>
    );
}