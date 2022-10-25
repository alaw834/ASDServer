function handleValidation(firstName,lastName,phoneNumber,password,streetNumber,streetName,postcode) {
    let formIsValid = true;

    if (!firstName) {
      formIsValid = false;
    }
    else if (!firstName.match(/^[a-zA-Z]+$/)){
      formIsValid = false;
    }

    if (!lastName) {
      formIsValid = false;
    }
    else if (!lastName.match(/^[a-zA-Z]+$/)){
      formIsValid = false;
    }

    if (!phoneNumber) {
      formIsValid = false;
    }
    else if (!phoneNumber.match(/^[0-9]*$/)){
      formIsValid = false;
    }
    else if (phoneNumber.length != 10){
      formIsValid = false;
    }

    if (!password) {
      formIsValid = false;
    }

    if (!streetNumber) {
      formIsValid = false;
    }

    if (!streetName) {
      formIsValid = false;
    }
    else if (!streetName.match(/^[a-z A-Z]+$/)){
      formIsValid = false;
    }

    if (!postcode) {
      formIsValid = false;
    }
    else if (!postcode.match(/^[0-9]*$/)){
      formIsValid = false;
    }
    else if (postcode.length != 4){
      formIsValid = false;
    }
    

    return formIsValid;
  }

 module.exports = {
    handleValidation
}