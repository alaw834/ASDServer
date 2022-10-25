import React from "react";

// We use Route in order to define the different routes of our application
import CreateRoutes from "./createRoutes";

// We import all the components we need in our app
import Navbar from "./components/nav/navbar";

const App = () => {
    return (
        <div>
            <Navbar />

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <CreateRoutes />
            </div>
        </div>
    );
};

export default App;