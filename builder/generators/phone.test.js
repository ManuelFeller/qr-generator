import { jest } from "@jest/globals";

import generatePhoneFromInputs from "./phone";

describe("generatePhoneFromInputs", () => {
  let inputPhone;

  beforeEach(() => {
    inputPhone = { value: "" };

    document.getElementById = jest.fn().mockImplementation((id) => {
      switch (id) {
        case "phoneQrNumber":
          return inputPhone;
        default:
          return null;
      }
    });

    window.alert = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return null and alert when phone input is empty", () => {
    expect(generatePhoneFromInputs()).toBeNull();
    expect(window.alert).toHaveBeenCalledWith(
      "No content was provided for the QR code.\nGeneration not possible..."
    );
  });

  it("should return tel link with phone number when phone input is provided", () => {
    inputPhone.value = "1234567890";
    expect(generatePhoneFromInputs()).toBe("tel:1234567890");
  });

  it("should return tel link with phone number when phone input is provided with leading/trailing spaces", () => {
    inputPhone.value = " 1234567890 ";
    expect(generatePhoneFromInputs()).toBe("tel:1234567890");
  });
});
