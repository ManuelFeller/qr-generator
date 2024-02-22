import { jest } from "@jest/globals";

import generateSmsFromInputs from "./sms";

describe("generateSmsFromInputs", () => {
  let inputPhone, inputMessage;

  beforeEach(() => {
    inputPhone = { value: "" };
    inputMessage = { value: "" };

    document.getElementById = jest.fn().mockImplementation((id) => {
      switch (id) {
        case "smsQrNumber":
          return inputPhone;
        case "smsQrMessage":
          return inputMessage;
        default:
          return null;
      }
    });

    window.alert = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return null and alert when phone or message input is empty", () => {
    expect(generateSmsFromInputs()).toBeNull();
    expect(window.alert).toHaveBeenCalledWith(
      "No content was provided for the QR code.\nGeneration not possible..."
    );
  });

  it("should return smsto link with phone number and message when both inputs are provided", () => {
    inputPhone.value = "1234567890";
    inputMessage.value = "Hello, World!";
    expect(generateSmsFromInputs()).toBe("smsto:1234567890:Hello, World!");
  });

  it("should return smsto link with phone number and message when phone input is provided with leading/trailing spaces", () => {
    inputPhone.value = " 1234567890 ";
    inputMessage.value = "Hello, World!";
    expect(generateSmsFromInputs()).toBe("smsto:1234567890:Hello, World!");
  });

  it("should return smsto link with phone number and message when message input is provided with leading/trailing spaces", () => {
    inputPhone.value = "1234567890";
    inputMessage.value = " Hello, World! ";
    expect(generateSmsFromInputs()).toBe("smsto:1234567890:Hello, World!");
  });

  it("should return smsto link with phone number and message when both inputs are provided with leading/trailing spaces", () => {
    inputPhone.value = " 1234567890 ";
    inputMessage.value = " Hello, World! ";
    expect(generateSmsFromInputs()).toBe("smsto:1234567890:Hello, World!");
  });
});
