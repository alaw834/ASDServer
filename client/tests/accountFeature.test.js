const { handleValidation } = require("../../client/src/components/accounts/accounts_test_helper")

describe("Empty form in edit function", () => {
    it('should return formIsValid = false', () => {
        const firstName = ""
        const phoneNumber = ""
        const lastName = ""
        const password = ""
        const streetNumber = ""
        const streetName = ""
        const postcode = ""
        const result = handleValidation(firstName, lastName, phoneNumber, password, streetNumber, streetName, postcode)
        expect(result).toBe(false)
    })
});

describe("Correct form in edit function", () => {
    it('should return formIsValid = true', () => {
        const firstName = "David"
        const phoneNumber = "0456372901"
        const lastName = "Martinez"
        const password = "Passsword"
        const streetNumber = "12"
        const streetName = "Night City"
        const postcode = "2000"
        const result = handleValidation(firstName, lastName, phoneNumber, password, streetNumber, streetName, postcode)
        expect(result).toBe(true)
    })
});

describe("First Name has numbers", () => {
    it('should return formIsValid = false', () => {
        const firstName = "David11"
        const phoneNumber = "1234567890"
        const lastName = "Martinez"
        const password = "Passsword"
        const streetNumber = "12"
        const streetName = "Night City"
        const postcode = "1111"
        const result = handleValidation(firstName, lastName, phoneNumber, password, streetNumber, streetName, postcode)
        expect(result).toBe(false)
    })
});

describe("Last Name has numbers", () => {
    it('should return formIsValid = false', () => {
        const firstName = "David"
        const phoneNumber = "1234567890"
        const lastName = "Martinez11"
        const password = "Passsword"
        const streetNumber = "12"
        const streetName = "Night City"
        const postcode = "1111"
        const result = handleValidation(firstName, lastName, phoneNumber, password, streetNumber, streetName, postcode)
        expect(result).toBe(false)
    })
});

describe("Phone Number has letters", () => {
    it('should return formIsValid = false', () => {
        const firstName = "David"
        const phoneNumber = "This is a phone number"
        const lastName = "Martinez"
        const password = "Passsword"
        const streetNumber = "12"
        const streetName = "Night City"
        const postcode = "1111"
        const result = handleValidation(firstName, lastName, phoneNumber, password, streetNumber, streetName, postcode)
        expect(result).toBe(false)
    })
});

describe("Phone Number length != 10", () => {
    it('should return formIsValid = false', () => {
        const firstName = "David"
        const phoneNumber = "123456789012"
        const lastName = "Martinez"
        const password = "Passsword"
        const streetNumber = "12"
        const streetName = "Night City"
        const postcode = "1111"
        const result = handleValidation(firstName, lastName, phoneNumber, password, streetNumber, streetName, postcode)
        expect(result).toBe(false)
    })
});

describe("Postcode length != 4", () => {
    it('should return formIsValid = false', () => {
        const firstName = "David"
        const phoneNumber = "0456372901"
        const lastName = "Martinez"
        const password = "Passsword"
        const streetNumber = "12"
        const streetName = "Night City"
        const postcode = "20001"
        const result = handleValidation(firstName, lastName, phoneNumber, password, streetNumber, streetName, postcode)
        expect(result).toBe(false)
    })
});

describe("Postcode has letters", () => {
    it('should return formIsValid = false', () => {
        const firstName = "David"
        const phoneNumber = "0456372901"
        const lastName = "Martinez"
        const password = "Passsword"
        const streetNumber = "12"
        const streetName = "Night City"
        const postcode = "Thisisapostcode"
        const result = handleValidation(firstName, lastName, phoneNumber, password, streetNumber, streetName, postcode)
        expect(result).toBe(false)
    })
});