import { jest } from "@jest/globals";

import generateTotpFromInputs from "./totp";

describe("generateTotpFromInputs", () => {
  let totpIssuer, totpAccount, totpSecret;

  beforeEach(() => {
    totpIssuer = { value: "" };
    totpAccount = { value: "" };
    totpSecret = { value: "" };

    document.getElementById = jest.fn().mockImplementation((id) => {
      switch (id) {
        case "totpQrIssuer":
          return totpIssuer;
        case "totpQrAccount":
          return totpAccount;
        case "totpQrSecret":
          return totpSecret;
        default:
          return null;
      }
    });

    window.alert = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

	it("should return null and alert when issuer input is empty", () => {
    totpAccount.value = "random";
    totpSecret.value = "random";
    expect(generateTotpFromInputs()).toBeNull();
    expect(window.alert).toHaveBeenCalledWith(
      "No content was provided for the Issuer.\nGeneration not possible..."
    );
  });
  it("should return null and alert when account input is empty", () => {
  	totpIssuer.value = "random";
		totpSecret.value = "random";
		expect(generateTotpFromInputs()).toBeNull();
    expect(window.alert).toHaveBeenCalledWith(
      "No content was provided for the Account.\nGeneration not possible..."
    );
  });
	it("should return null and alert when secret input is empty", () => {
		totpIssuer.value = "random";
    totpAccount.value = "random";
    expect(generateTotpFromInputs()).toBeNull();
    expect(window.alert).toHaveBeenCalledWith(
      "No content was provided for the Secret.\nGeneration not possible..."
    );
  });


  it("should return mailto link with email, subject and body when all inputs are provided", () => {
    totpIssuer.value = "Manual";
    totpAccount.value = "Account";
    totpSecret.value = "YOUR_SECRET_HERE";
    expect(generateTotpFromInputs()).toBe(
      "otpauth://totp/Manual:Account?secret=YOUR_SECRET_HERE&issuer=Manual"
    );
  });
});
