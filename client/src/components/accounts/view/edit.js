import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function EditAccount() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    password: "",
    dob: "",
    streetNumber: "",
    streetName: "",
    postcode: "",
    errors: {},
    records: [],
  });

  const [errors] = useState({
    firstNameError: "",
    lastNameError: "",
    emailAddressError: "",
    phoneNumberError: "",
    passwordError: "",
    dobError: "",
    streetNumberError: "",
    streetNameError: "",
    postCodeError: ""
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:5000/user/listUser/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    handleValidation();
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      firstName: form.firstName,
      lastName: form.lastName,
      emailAddress: form.emailAddress,
      phoneNumber: form.phoneNumber,
      password: form.password,
      dob: form.dob,
      streetNumber: form.streetNumber,
      streetName: form.streetName,
      postcode: form.postcode,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/user/update/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify(editedPerson),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/");
  }

  function handleValidation() {
    let formIsValid = true;

    if (!form.firstName) {
      formIsValid = false;
      errors.firstNameError = "Cannot be empty";
    }
    else if (!form.firstName.match(/^[a-zA-Z]+$/)) {
      formIsValid = false;
      errors.firstNameError = "Only letters";
    }
    else {
      errors.firstNameError = "";
    }

    if (!form.lastName) {
      formIsValid = false;
      errors.lastNameError = "Cannot be empty";
    }
    else if (!form.lastName.match(/^[a-zA-Z]+$/)) {
      formIsValid = false;
      errors.lastNameError = "Only letters";
    }
    else {
      errors.lastNameError = "";
    }

    if (!form.phoneNumber) {
      formIsValid = false;
      errors.phoneNumberError = "Cannot be empty";
    }
    else if (!form.phoneNumber.match(/^[0-9]*$/)) {
      formIsValid = false;
      errors.phoneNumberError = "Only numbers";
    }
    else if (form.phoneNumber.length != 10){
      formIsValid = false;
      errors.phoneNumberError = "Check Length";
    }
    else {
      errors.phoneNumberError = "";
    }

    if (!form.password) {
      formIsValid = false;
      errors.passwordError = "Cannot be empty";
    }
    else {
      errors.passwordError = "";
    }

    if (!form.streetNumber) {
      formIsValid = false;
      errors.streetNumberError = "Cannot be empty";
    }
    else {
      errors.streetNumberError = "";
    }

    if (!form.streetName) {
      formIsValid = false;
      errors.streetNameError = "Cannot be empty";
    }
    else if (!form.streetName.match(/^[a-z A-Z]+$/)) {
      formIsValid = false;
      errors.streetNameError = "Only letters";
    }
    else {
      errors.streetNameError = "";
    }

    if (!form.postcode) {
      formIsValid = false;
      errors.postCodeError = "Cannot be empty";
    }
    else if (!form.postcode.match(/^[0-9]*$/)) {
      formIsValid = false;
      errors.postCodeError = "Only numbers";
    }
    else if (form.postcode.length != 4){
      formIsValid = false;
      errors.postCodeError = "Check Length";
    }
    else {
      errors.postCodeError = "";
    }
  
    if (formIsValid == true) {
      errors.emailAddressError = "";
      errors.dobError = "";
    }
    return formIsValid;
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div class="d-flex flex-column align-items-center text-center p-3 py-5">
      <h3>Update Account Details</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group p-1">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={form.firstName}
            onChange={(e) => updateForm({ firstName: e.target.value })}
          />
          <span style={{ color: "red" }}>{errors.firstNameError}</span>
        </div>
        <div className="form-group p-1">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={form.lastName}
            onChange={(e) => updateForm({ lastName: e.target.value })}
          />
          <span style={{ color: "red" }}>{errors.lastNameError}</span>
        </div>
        <div className="form-group p-1">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            value={form.phoneNumber}
            onChange={(e) => updateForm({ phoneNumber: e.target.value })}
          />
          <span style={{ color: "red" }}>{errors.phoneNumberError}</span>
        </div>
        <div className="form-group p-1">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            className="form-control"
            id="password"
            value={form.password}
            onChange={(e) => updateForm({ password: e.target.value })}
          />
          <span style={{ color: "red" }}>{errors.passwordError}</span>
        </div>
        <div className="form-group p-1">
          <label htmlFor="streetNumber">Street Number</label>
          <input
            type="text"
            className="form-control"
            id="streetNumber"
            value={form.streetNumber}
            onChange={(e) => updateForm({ streetNumber: e.target.value })}
          />
          <span style={{ color: "red" }}>{errors.streetNumberError}</span>
        </div>
        <div className="form-group p-1">
          <label htmlFor="streetName">Street Name</label>
          <input
            type="text"
            className="form-control"
            id="streetName"
            value={form.streetName}
            onChange={(e) => updateForm({ streetName: e.target.value })}
          />
          <span style={{ color: "red" }}>{errors.streetNameError}</span>
        </div>
        <div className="form-group p-1">
          <label htmlFor="position">Post Code</label>
          <input
            type="text"
            className="form-control"
            id="postcode"
            value={form.postcode}
            onChange={(e) => updateForm({ postcode: e.target.value })}
          />
          <span style={{ color: "red" }}>{errors.postCodeError}</span>
        </div>
        <div className="form-group">
          {(() => {
            switch (handleValidation()) {
              case true: return <><input type="submit" value="Edit" className="btn btn-primary" /></>;
              case false: return null;
              default: return <button>Error</button>;
            }
          })()}
        </div>
      </form>
    </div>
  );
}
