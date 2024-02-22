import { jest } from "@jest/globals";

import generateLinkFromInputs from "./link";

describe("generateLinkFromInputs", () => {
  let typeSelector, urlInput;

  beforeEach(() => {
    typeSelector = { value: "" };
    urlInput = { value: "" };

    document.getElementById = jest.fn().mockImplementation((id) => {
      switch (id) {
        case "linkQrProtocol":
          return typeSelector;
        case "linkQrUrl":
          return urlInput;
        default:
          return null;
      }
    });

    window.alert = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return null and alert when url input is empty", () => {
    expect(generateLinkFromInputs()).toBeNull();
    expect(window.alert).toHaveBeenCalledWith(
      "No content was provided for the QR code.\nGeneration not possible..."
    );
  });

  it("should return http link when type is http", () => {
    urlInput.value = "test.com";
    typeSelector.value = "http";
    expect(generateLinkFromInputs()).toBe("http://test.com");
  });

  it("should return https link when type is https", () => {
    urlInput.value = "test.com";
    typeSelector.value = "https";
    expect(generateLinkFromInputs()).toBe("https://test.com");
  });

  it("should return url as is when type is neither http nor https", () => {
    urlInput.value = "test.com";
    typeSelector.value = "ftp";
    expect(generateLinkFromInputs()).toBe("test.com");
  });

  it("should return url as is when type is empty", () => {
    urlInput.value = "test.com";
    expect(generateLinkFromInputs()).toBe("test.com");
  });
});
