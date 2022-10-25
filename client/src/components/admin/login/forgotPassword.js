import React from "react"


const emails = ["abc@gmail.com", "def@gmail.com", "ghi@gmail.com"];

function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.username.value);
    const submittedUsername = e.target.username.value

    for (let i = 0; i < emails.length; i++) {
        if (submittedUsername === emails[i]) {
            Notification.requestPermission().then(function (result) {
                new Notification("Recovery Email Sent")
                console.log("success")
            })
            break;
        }
        else {
            Notification.requestPermission().then(function (result) {
                new Notification("Username not found")
                console.log("failed")
            })
            break;
        }
    }
}

export default function ForgotPassword(props) {
    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Forgot your password?</h3>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            name="username"
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}