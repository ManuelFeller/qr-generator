import { jest } from "@jest/globals";

import generateEventFromInputs from "./event";

jest.spyOn(window, 'alert').mockImplementation(() => {}); // ToDo: test if alerts open?

describe("generateEventFromInputs", () => {
  let inputTitle,
    inputDescription,
    inputLocation,
    inputStartDate,
    inputStartTime,
    inputEndDate,
    inputEndTime,
    inputIsWholeDay;

  beforeEach(() => {
    document.body.innerHTML =
      '<input id="eventQrTitle" /><input id="eventQrDescription" /><input id="eventQrLocation" /><input id="eventQrStartDate" /><input id="eventQrStartTime" /><input id="eventQrEndDate" /><input id="eventQrEndTime" /><input id="eventQrIsWholeDay" type="checkbox" />';
    inputTitle = document.getElementById("eventQrTitle");
    inputDescription = document.getElementById("eventQrDescription");
    inputLocation = document.getElementById("eventQrLocation");
    inputStartDate = document.getElementById("eventQrStartDate");
    inputStartTime = document.getElementById("eventQrStartTime");
    inputEndDate = document.getElementById("eventQrEndDate");
    inputEndTime = document.getElementById("eventQrEndTime");
    inputIsWholeDay = document.getElementById("eventQrIsWholeDay");
  });

  it("should return null if no title is provided", () => {
    expect(generateEventFromInputs()).toBeNull();
  });

  it("should return null if no start and/or end date(s) are provided", () => {
    inputTitle.value = "Test Event";
    expect(generateEventFromInputs()).toBeNull();
  });

  it("should return null if no start and/or end times are provided for an event that is not a whole day", () => {
    inputTitle.value = "Test Event";
    inputStartDate.value = "2022-01-01";
    inputEndDate.value = "2022-01-02";
    expect(generateEventFromInputs()).toBeNull();
  });

  it("should replace commas with dots in the input values", () => {
    inputTitle.value = "Test Event";
    inputStartDate.value = "2022-01-01";
    inputEndDate.value = "2022-01-02";
    inputStartTime.value = "12:00";
    inputEndTime.value = "13:00";
    inputDescription.value = "This is a test event.";
    inputLocation.value = "Test Location, Test City";
    expect(generateEventFromInputs()).toEqual(
      `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nLOCATION:Test Location, Test City\nDTSTART:20220101T120000Z\nDTEND:20220102T130000Z\nSUMMARY:Test Event\nDESCRIPTION:This is a test event.\nEND:VEVENT\nEND:VCALENDAR`
    );
  });

  it("should handle whole day events correctly", () => {
    inputTitle.value = "Test Event";
    inputStartDate.value = "2022-01-01";
    inputEndDate.value = "2022-01-02";
    inputIsWholeDay.checked = true;
    expect(generateEventFromInputs()).toEqual(
      `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:20220101\nDTEND:20220102\nSUMMARY:Test Event\nEND:VEVENT\nEND:VCALENDAR`
    );
  });
});
