import { jest } from "@jest/globals";

import generateContactFromInputs, {
  vCardGenerateNameFields,
  vCardGenerateAddress,
  vCardGenerateOrgInfo,
  vCardGeneratePhoneField,
  vCardGenerateEmailField,
  vCardGenerateUrlField,
} from "./contact";

jest.mock("./contact");

jest.spyOn(window, "alert").mockImplementation(() => {}); // ToDo: test if alerts open?

describe("generateContactFromInputs", () => {
  beforeEach(() => {
    // window.alert = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the correct vCard string", () => {
    document.getElementById = jest.fn().mockImplementation((id) => {
      switch (id) {
        case "contactInputTitle":
          return { value: "" };
        case "contactInputFirstName":
          return { value: "John" };
        case "contactInputMiddleName":
          return { value: "" };
        case "contactInputLastName":
          return { value: "Doe" };
        case "contactInputNameSuffix":
          return { value: "" };
        case "contactInputCompany":
          return { value: "Acme Inc." };
        case "contactInputJobTitle":
          return { value: "CEO" };
        case "contactInputContactType":
          return { value: "work" };
        case "contactInputPoBox":
          return { value: "" };
        case "contactInputAdditionalAddress":
          return { value: "" };
        case "contactInputStreetAndNumber":
          return { value: "123 Main St." };
        case "contactInputZipCode":
          return { value: "12345" };
        case "contactInputCity":
          return { value: "Springfield" };
        case "contactInputRegion":
          return { value: "IL" };
        case "contactInputCountry":
          return { value: "USA" };
        case "contactInputMobile":
          return { value: "(123) 555-5832" };
        case "contactInputLandline":
          return { value: "" };
        case "contactInputEmail":
          return { value: "john.doe@acme.com" };
        case "contactInputUrl":
          return { value: "www.acme.com" };
        default:
          return null;
      }
    });

    const result = generateContactFromInputs();

    expect(result).toBe(
      "BEGIN:VCARD\nVERSION:4.0\nFN:John Doe\nN:Doe;John;;;\nORG:Acme Inc.\nTITLE:CEO\nADR;TYPE=work:;;123 Main St.;Springfield;IL;12345;USA\nTEL;TYPE=cell,text,voice:(123) 555-5832\nEMAIL;TYPE=work:john.doe@acme.com\nURL;TYPE=work:www.acme.com\nEND:VCARD"
    );
  });
});

describe("vCardGenerateNameFields", () => {
  it("should return the correct string", () => {
    const result = vCardGenerateNameFields(
      "Dr.",
      "John",
      "Philip",
      "Doe",
      "Jr.,M.D.,A.C.P."
    );
    expect(result).toBe(
      "FN:Dr. John Doe\nN:Doe;John;Philip;Dr.;Jr.,M.D.,A.C.P.\n"
    );
  });
});

describe("vCardGenerateAddress", () => {
  it("should return the correct string", () => {
    const result = vCardGenerateAddress(
      "home",
      "",
      "Apartment 123",
      "123 Main St.",
      "Springfield",
      "IL",
      "12345",
      "USA"
    );
    expect(result).toBe(
      "ADR;TYPE=home:;Apartment 123;123 Main St.;Springfield;IL;12345;USA\n"
    );
  });
});

describe("vCardGenerateOrgInfo", () => {
  it("should return the correct string", () => {
    const result = vCardGenerateOrgInfo("Acme Inc.", "CEO");
    expect(result).toBe("ORG:Acme Inc.\nTITLE:CEO\n");
  });
});

describe("vCardGeneratePhoneField", () => {
  it("should return the correct string", () => {
    const result = vCardGeneratePhoneField("cell", "(123) 555-5832");
    expect(result).toBe("TEL;TYPE=cell:(123) 555-5832\n");
  });
});

describe("vCardGenerateEmailField", () => {
  it("should return the correct string", () => {
    const result = vCardGenerateEmailField("work", "john.doe@acme.com");
    expect(result).toBe("EMAIL;TYPE=work:john.doe@acme.com\n");
  });
});

describe("vCardGenerateUrlField", () => {
  it("should return the correct string", () => {
    const result = vCardGenerateUrlField("work", "www.acme.com");
    expect(result).toBe("URL;TYPE=work:www.acme.com\n");
  });
});
