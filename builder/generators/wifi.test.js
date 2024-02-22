import { jest } from "@jest/globals";

import generateWifiFromInputs from "./wifi";

describe("generateWifiFromInputs", () => {
  let inputEncryption, inputSsid, inputPassword, inputHidden;

  beforeEach(() => {
    inputEncryption = { value: "" };
    inputSsid = { value: "" };
    inputPassword = { value: "" };
    inputHidden = { checked: false };

    document.getElementById = jest.fn().mockImplementation((id) => {
      switch (id) {
        case "wifiQrEncryption":
          return inputEncryption;
        case "wifiQrSsid":
          return inputSsid;
        case "wifiQrPass":
          return inputPassword;
        case "wifiQrHidden":
          return inputHidden;
        default:
          return null;
      }
    });

    window.alert = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return null and alert when SSID is empty", () => {
    expect(generateWifiFromInputs()).toBeNull();
    expect(window.alert).toHaveBeenCalledWith(
      "No SSID was provided for the QR code.\nGeneration not possible..."
    );
  });

  it('should return null and alert when encryption is not "none" and password is empty', () => {
    inputSsid.value = "SSID";
    inputEncryption.value = "wep";
    expect(generateWifiFromInputs()).toBeNull();
    expect(window.alert).toHaveBeenCalledWith(
      "No Password was provided for the encrypted network.\nQR Generation not possible..."
    );
  });

  it('should return WIFI string with WEP encryption when encryption is "wep" and password is provided', () => {
    inputSsid.value = "SSID";
    inputEncryption.value = "wep";
    inputPassword.value = "password";
    expect(generateWifiFromInputs()).toBe(
      "WIFI:S:SSID;T:WEP;P:password;H:false;;"
    );
  });

  it('should return WIFI string with WPA encryption when encryption is "wpa" and password is provided', () => {
    inputSsid.value = "SSID";
    inputEncryption.value = "wpa";
    inputPassword.value = "password";
    expect(generateWifiFromInputs()).toBe(
      "WIFI:S:SSID;T:WPA;P:password;H:false;;"
    );
  });

  it("should return WIFI string with hidden network when hidden is checked", () => {
    inputSsid.value = "SSID";
    inputEncryption.value = "wpa";
    inputPassword.value = "password";
    inputHidden.checked = true;
    expect(generateWifiFromInputs()).toBe(
      "WIFI:S:SSID;T:WPA;P:password;H:true;;"
    );
  });
});
