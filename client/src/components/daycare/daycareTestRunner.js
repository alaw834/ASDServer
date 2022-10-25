function handleValidation(
  daycareName,
  daycareType,
  daycareDescription,
  daycareCapacity,
  daycarePrice
) {
  let formIsValid = true;

  if (!daycareName) {
    formIsValid = false;
    // console.log("Daycare name is missing");
  }

  if (!daycareType) {
    formIsValid = false;
    // console.log("Daycare type is missing");
  }

  if (!daycareDescription) {
    formIsValid = false;
    // console.log("Daycare description is missing");
  }

  if (!daycareCapacity) {
    formIsValid = false;
    // console.log("Daycare capacity is missing");
  } else if (daycareCapacity < 0) {
    formIsValid = false;
  }

  if (!daycarePrice) {
    formIsValid = false;
    // console.log("Daycare price is missing");
  } else if (daycarePrice < 0) {
    formIsValid = false;
  }

  return formIsValid;
}

module.exports = { handleValidation };
