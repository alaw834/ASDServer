let regDec = /^-?\d+\.?\d*$/;
let regInt = /^-?\d+$/;

export function intValidation(input) {
  return regInt.test(input);
}

export function decValidation(input) {
  return regDec.test(input);
}

export function stringValidation(input) {
  return input.trim().length > 0 && input.trim() !== "";
}
