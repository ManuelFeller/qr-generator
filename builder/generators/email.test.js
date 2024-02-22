import { jest } from "@jest/globals";

import generateEmailFromInputs from "./email";

describe("generateEmailFromInputs", () => {
  let emailInput, subjectInput, bodyInput;

  beforeEach(() => {
    emailInput = { value: "" };
    subjectInput = { value: "" };
    bodyInput = { value: "" };

    document.getElementById = jest.fn().mockImplementation((id) => {
      switch (id) {
        case "emailQrAddress":
          return emailInput;
        case "emailQrSubject":
          return subjectInput;
        case "emailQrBody":
          return bodyInput;
        default:
          return null;
      }
    });

    window.alert = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return null and alert when email input is empty", () => {
    expect(generateEmailFromInputs()).toBeNull();
    expect(window.alert).toHaveBeenCalledWith(
      "No content was provided for the QR code.\nGeneration not possible..."
    );
  });

  it("should return mailto link with email when subject and body are empty", () => {
    emailInput.value = "test@example.com";
    expect(generateEmailFromInputs()).toBe("mailto:test@example.com");
  });

  it("should return mailto link with email and subject when body is empty", () => {
    emailInput.value = "test@example.com";
    subjectInput.value = "Test Subject";
    expect(generateEmailFromInputs()).toBe(
      "mailto:test@example.com?subject=Test%20Subject"
    );
  });

  it("should return mailto link with email, subject and body when all inputs are provided", () => {
    emailInput.value = "test@example.com";
    subjectInput.value = "Test Subject";
    bodyInput.value = "Test Body";
    expect(generateEmailFromInputs()).toBe(
      "mailto:test@example.com?subject=Test%20Subject&body=Test%20Body"
    );
  });
});
