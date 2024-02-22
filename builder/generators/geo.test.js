import { jest } from "@jest/globals";

import generateCoordinatesFromInputs from "./geo";

jest.spyOn(window, 'alert').mockImplementation(() => {}); // ToDo: test if alerts open?

describe("generateCoordinatesFromInputs", () => {
  beforeEach(() => {
    document.body.innerHTML = '<input id="geoQrLon" /><input id="geoQrLat" />';
  });

  it("should return null if inputs are empty", () => {
    expect(generateCoordinatesFromInputs()).toBeNull();
  });

  it("should replace commas with dots in the input values", () => {
    document.getElementById("geoQrLon").value = "123,456";
    document.getElementById("geoQrLat").value = "789,012";
    expect(generateCoordinatesFromInputs()).toBe("geo:789.012,123.456");
  });

  it("should return null if user confirms missing coordinates", () => {
    window.confirm = jest.fn().mockReturnValue(true);
    document.getElementById("geoQrLon").value = "";
    document.getElementById("geoQrLat").value = "";
    expect(generateCoordinatesFromInputs()).toBeNull();
  });
});
