const {
  stringValidation,
  intValidation,
  decValidation,
} = require("../src/components/rooms/validation.js");

describe("Integer validation check positive", () => {
  it("Should allow a string which is number", () => {
    const input = "12345";
    const result = intValidation(input);
    expect(result).toBe(true);
  });
});

describe("Integer validation check negative", () => {
  it("Should not allow a string containing anything but integers", () => {
    const input = "12345a";
    const result = intValidation(input);
    expect(result).toBe(false);
  });
});

describe("String validation check positive", () => {
  it("Should allow any string", () => {
    const input = "Harry Potter";
    const result = stringValidation(input);
    expect(result).toBe(true);
  });
});

describe("String validation check negative", () => {
  it("Should not allow an empty string", () => {
    const input = "";
    const result = stringValidation(input);
    expect(result).toBe(false);
  });
});

describe("Decimal validation check positive", () => {
  it("Should allow any decimal", () => {
    const input = "3.14159";
    const result = decValidation(input);
    expect(result).toBe(true);
  });
});

describe("Decimal validation check negative", () => {
  it("Should not allow an non decimal", () => {
    const input = "123.2a";
    const result = decValidation(input);
    expect(result).toBe(false);
  });
});
