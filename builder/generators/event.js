const generateEventFromInputs = () => {
	const inputTitle = document.getElementById("eventQrTitle");
	const inputDescription = document.getElementById("eventQrDescription");
	const inputLocation = document.getElementById("eventQrLocation");
	const inputStartDate = document.getElementById("eventQrStartDate");
	const inputStartTime = document.getElementById("eventQrStartTime");
	const inputEndDate = document.getElementById("eventQrEndDate");
	const inputEndTime = document.getElementById("eventQrEndTime");
	const inputIsWholeDay = document.getElementById("eventQrIsWholeDay");

	// check if all required inputs are there

	if (inputTitle.value.trim() === '') {
		alert("No title provided for the event.\nGeneration not possible...");
		return null;
	}

	if (inputStartDate.value === '' || inputEndDate.value === '') {
		alert("No start and / or end date(s) provided for the event.\nGeneration not possible...");
		return null;
	}

	if(!inputIsWholeDay.checked) {
		// time needs to be set too
		if (inputStartTime.value === '' || inputEndTime.value === '') {
			alert("No start and / or end times provided for an event that is not full day.\nGeneration not possible...");
			return null;
		}
	}

	// ToDo: some more sanity checks, e.g. not start before end

	// start generating the elements for later use
	const summaryString = `SUMMARY:${inputTitle.value.trim()}\n`;

	// optionals
	let description = '';
	if (inputDescription.value.trim() !== '') {
		description = `DESCRIPTION:${inputDescription.value.trim()}\n`;
	}

	let location = '';
	if (inputLocation.value.trim() !== '') {
		location = `LOCATION:${inputLocation.value.trim()}\n`;
	}

	// create date strings & reminder
	let reminder = ''
	let startString = '';
	let endString = '';
	if (!inputIsWholeDay.checked) {
		const startDate = new Date(inputStartDate.value + ' ' + inputStartTime.value);
		const endDate = new Date(inputEndDate.value + ' ' + inputEndTime.value);	
		startString = `DTSTART:${startDate.getUTCFullYear()}${addLeadingZeroIfNeeded(startDate.getUTCMonth() + 1)}${addLeadingZeroIfNeeded(startDate.getUTCDate())}`;
		endString = `DTEND:${endDate.getUTCFullYear()}${addLeadingZeroIfNeeded(endDate.getUTCMonth() + 1)}${addLeadingZeroIfNeeded(endDate.getUTCDate())}`;
		startString += `T${startDate.getUTCHours()}${startDate.getUTCMinutes()}00Z\n`;
		endString += `T${endDate.getUTCHours()}${endDate.getUTCMinutes()}00Z\n`;
		// reminders make things more complicated, so for now this will not be activated (some Androids Apps are super picky on that)
		// generate default reminder, 15 minutes before event
		// reminder = `BEGIN:VALARM\nTRIGGER:-PT15M\nACTION:DISPLAY\nDESCRIPTION:Reminder\nEND:VALARM\n`;
		// Description seems to be required to be "Reminder" for some reason - else some reader can not interpret the content properly
	} else {
		const startDate = new Date(inputStartDate.value);
		const endDate = new Date(inputEndDate.value);	
		startString = `DTSTART:${startDate.getUTCFullYear()}${addLeadingZeroIfNeeded(startDate.getUTCMonth() + 1)}${addLeadingZeroIfNeeded(startDate.getUTCDate())}\n`;
		endString = `DTEND:${endDate.getUTCFullYear()}${addLeadingZeroIfNeeded(endDate.getUTCMonth() + 1)}${addLeadingZeroIfNeeded(endDate.getUTCDate())}\n`;
		// reminders make things more complicated, so for now this will not be activated (some Androids Apps are super picky on that)
		// generate default reminder, 6 hours before event date (18:00)
		// reminder = `BEGIN:VALARM\nTRIGGER:-PT6H\nACTION:DISPLAY\nDESCRIPTION:Reminder\nEND:VALARM\n`;
		// Description seems to be required to be "Reminder" for some reason - else some reader can not interpret the content properly
	}
	
	// combine everything and return it
	return `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\n${location}${startString}${endString}${summaryString}${description}END:VEVENT\nEND:VCALENDAR`;
	// reminders make things more complicated, so for now this will not be activated (some Androids Apps are super picky on that)
	// and as all Apps open the "Add Event" dialog teh user can define the alarm for themselves
	// return `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\n${location}${startString}${endString}${summaryString}${description}${reminder}END:VEVENT\nEND:VCALENDAR`;
}

const addLeadingZeroIfNeeded = (input) => {
	if (input.toString().length === 1) {
		return '0' + input.toString();
	}
	return input;
}

export default generateEventFromInputs;
