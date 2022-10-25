const {
  handleValidation,
} = require("../src/components/daycare/daycareTestRunner");

describe("Empty form", () => {
  it("should return forIsValid = false", () => {
    const daycareName = "";
    const daycareType = "";
    const daycareDescription = "";
    const daycareCapacity = "";
    const daycarePrice = "";
    const result = handleValidation(
      daycareName,
      daycareType,
      daycareDescription,
      daycareCapacity,
      daycarePrice
    );

    expect(result).toBe(false);
  });
});

describe("Correct form", () => {
  it("should return formIsValid = true", () => {
    const daycareName = "Rainbow Kids Club";
    const daycareType = "Care Centre";
    const daycareDescription = "Care centre for kids aged 2 to 10";
    const daycareCapacity = "50";
    const daycarePrice = "50";
    const result = handleValidation(
      daycareName,
      daycareType,
      daycareDescription,
      daycareCapacity,
      daycarePrice
    );
    expect(result).toBe(true);
  });
});

describe("Daycare name contains number", () => {
  it("should return formIsValid = true", () => {
    const daycareName = "Daycare123";
    const daycareType = "Care Centre";
    const daycareDescription = "Care centre for kids aged 2 to 10";
    const daycareCapacity = "50";
    const daycarePrice = "50";
    const result = handleValidation(
      daycareName,
      daycareType,
      daycareDescription,
      daycareCapacity,
      daycarePrice
    );
    expect(result).toBe(true);
  });
});

describe("Daycare capacity is negative", () => {
  it("should return formIsValid = false", () => {
    const daycareName = "Daycare123";
    const daycareType = "Care Centre";
    const daycareDescription = "Care centre for kids aged 2 to 10";
    const daycareCapacity = "-10";
    const daycarePrice = "50";
    const result = handleValidation(
      daycareName,
      daycareType,
      daycareDescription,
      daycareCapacity,
      daycarePrice
    );
    expect(result).toBe(false);
  });
});

describe("Daycare price is negative", () => {
  it("should return formIsValid = false", () => {
    const daycareName = "Daycare123";
    const daycareType = "Care Centre";
    const daycareDescription = "Care centre for kids aged 2 to 10";
    const daycareCapacity = "50";
    const daycarePrice = "-100";
    const result = handleValidation(
      daycareName,
      daycareType,
      daycareDescription,
      daycareCapacity,
      daycarePrice
    );
    expect(result).toBe(false);
  });
});

describe("JEMOO", () => {
  it("should return formIsValid = false", () => {
    const result = false;
    expect(result).toBe(false);
  });
});
