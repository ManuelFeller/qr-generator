import { jest } from "@jest/globals";

import generateTextFromInputs from "./text";

describe("generateTextFromInputs", () => {
  let inputArea;

  beforeEach(() => {
    inputArea = { value: "" };

    document.getElementById = jest.fn().mockImplementation((id) => {
      switch (id) {
        case "textQrInput":
          return inputArea;
        default:
          return null;
      }
    });

    window.alert = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return null and alert when input is empty", () => {
    expect(generateTextFromInputs()).toBeNull();
    expect(window.alert).toHaveBeenCalledWith(
      "No content was provided for the QR code.\nGeneration not possible..."
    );
  });

  it("should return input text when input is provided", () => {
    inputArea.value = "Test text";
    expect(generateTextFromInputs()).toBe("Test text");
  });

  it("should return input text without leading/trailing spaces when input is provided with spaces", () => {
    inputArea.value = " Test text ";
    expect(generateTextFromInputs()).toBe("Test text");
  });

  it("should return input text without leading spaces when input is provided with leading spaces", () => {
    inputArea.value = "   Test text ";
    expect(generateTextFromInputs()).toBe("Test text");
  });

  it("should return input text without trailing spaces when input is provided with trailing spaces", () => {
    inputArea.value = "Test text   ";
    expect(generateTextFromInputs()).toBe("Test text");
  });
});
