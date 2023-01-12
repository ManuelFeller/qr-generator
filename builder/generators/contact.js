// Output is based on https://www.rfc-editor.org/rfc/rfc6350

const generateContactFromInputs = () => {

	// ToDo: check fields for illegal chars (e.g. ;)

	// name
	const inputTitle = document.getElementById('contactInputTitle');
	const inputFirstName = document.getElementById('contactInputFirstName');
	const inputMiddleName = document.getElementById('contactInputMiddleName');
	const inputLastName = document.getElementById('contactInputLastName');
	const inputNameSuffix = document.getElementById('contactInputNameSuffix');
	const outputName = vCardGenerateNameFields(
		inputTitle.value.trim(),
		inputFirstName.value.trim(),
		inputMiddleName.value.trim(),
		inputLastName.value.trim(),
		inputNameSuffix.value.trim()
	);

	// company details
	const inputCompany = document.getElementById('contactInputCompany');
	const inputJobTitle = document.getElementById('contactInputJobTitle');
	const outputCompany = vCardGenerateOrgInfo(
		inputCompany.value.trim(),
		inputJobTitle.value.trim()
	)

	// type work or home
	const inputContactType = document.getElementById('contactInputContactType');
	let contactType = 'home';
	if (inputContactType.value.trim().toLowerCase() === 'work') {
		contactType = 'work';
	}

	// address
	const inputPoBox = document.getElementById('contactInputPoBox');
	const inputAdditionalAddress = document.getElementById('contactInputAdditionalAddress');
	const inputStreetAndNumber = document.getElementById('contactInputStreetAndNumber');
	const inputZipCode = document.getElementById('contactInputZipCode');
	const inputCity = document.getElementById('contactInputCity');
	const inputRegion = document.getElementById('contactInputRegion');
	const inputCountry = document.getElementById('contactInputCountry');
	const outputAddress = vCardGenerateAddress(
		contactType,
		inputPoBox.value.trim(),
		inputAdditionalAddress.value.trim(),
		inputStreetAndNumber.value.trim(),
		inputCity.value.trim(),
		inputRegion.value.trim(),
		inputZipCode.value.trim(),
		inputCountry.value.trim()
	);

	// phones
	const inputMobile = document.getElementById('contactInputMobile');
	const outputMobile = vCardGeneratePhoneField('cell,text,voice', inputMobile.value.trim());

	const inputLandline = document.getElementById('contactInputLandline');
	const outputLandline = vCardGeneratePhoneField(`${contactType},voice`, inputLandline.value.trim());

	// internet
	const inputEmail = document.getElementById('contactInputEmail');
	const outputEmail = vCardGenerateEmailField(contactType, inputEmail.value.trim());
	const inputUrl = document.getElementById('contactInputUrl');
	const outputUrl = vCardGenerateUrlField(contactType, inputUrl.value.trim());

	if (outputName === '' &&
			outputCompany === '' &&
			outputAddress === '' &&
			outputMobile === '' &&
			outputLandline === '' &&
			outputEmail === '' &&
			outputUrl === ''
	) {
		alert("No content was provided for the QR code.\nGeneration not possible...");
		return null;
	}

	// sub-elements create their own line break, that way we do not need to check here if they have content or not
	const combinedContent = `BEGIN:VCARD\nVERSION:4.0\n${outputName}${outputCompany}${outputAddress}${outputMobile}${outputLandline}${outputEmail}${outputUrl}END:VCARD`;

	return combinedContent;
}

/**
 * Generate the name fields (FN & N)
 * @param {string} honorificPrefix Titles like Dr. or Prof. - if multiple ones they need to be separated by spaces
 * @param {string} firstName The first name (in best case only one, all others should go to middle names)
 * @param {string} middleName Additional middle names - if multiple ones they need to be separated by spaces
 * @param {string} lastName The last name / family name
 * @param {string} honorificSuffix Suffixes like M.. or Jr. - if multiple ones they need to be separated by spaces
 * @returns The strings to add to the vCard output
 */
const vCardGenerateNameFields = (honorificPrefix, firstName, middleName, lastName, honorificSuffix) => {
	// Name part (FN & N)
	// example form Spec: N:Stevenson;John;Philip,Paul;Dr.;Jr.,M.D.,A.C.P.
	// LastName;Firstname;MiddleName;Prefixes;Suffixes
	// Family Names (also known as surnames), Given Names, Additional Names, Honorific Prefixes, and Honorific Suffixes
	if (honorificPrefix !== '' ||
			firstName !== '' ||
			middleName !== '' ||
			lastName !== '' ||
			honorificSuffix !== ''
	) {
		// check honorific prefix for presence
		let fnPrefix = '';
		if (honorificPrefix !== '') {
			fnPrefix = honorificPrefix + ' ';
		}
		// combine first and last name for FN
		let fnName = '';
		if (firstName !== '' && lastName !== '') {
			// both parts present, space between name parts
			fnName = firstName + ' ' + lastName;
		} else {
			// only one of the two parts, no space in between parts
			fnName = firstName + '' + lastName;
		}
		// if any of the fields is set, generate the string
		return `FN:${fnPrefix}${fnName}\nN:${lastName};${firstName};${middleName};${honorificPrefix};${honorificSuffix}\n`;
	} else {
		// if all elements are empty return an empty string
		return '';
	}
}

/**
 * Generate the address field (ADR)
 * @param {string} type The address type, expected to be 'home' or 'work'
 * @param {string} poBox The PO box - if applicable
 * @param {string} extendedAddress The extended address, e.g. apartment or suite number - if applicable
 * @param {string} streetAddress The street address (street and house number)
 * @param {string} locality The locality, e.g. the city
 * @param {string} region The region, e.g. state or province
 * @param {string} postalCode The postal code
 * @param {string} country The country name
 * @returns The string to add to the vCard output
 */
const vCardGenerateAddress = (type, poBox, extendedAddress, streetAddress, locality, region, postalCode, country) => {
	// ADR;TYPE=home:;;123 Main St.;Springfield;IL;12345;USA
	// the post office box;
	// the extended address (e.g., apartment or suite number);
	// the street address;
	// the locality (e.g., city);
	// the region (e.g., state or province);
	// the postal code;
	// the country name
	if (poBox !== '' ||
			extendedAddress !== '' ||
			streetAddress !== '' ||
			locality !== '' ||
			region !== '' ||
			postalCode !== '' ||
			country !== ''
	) {
		return `ADR;TYPE=${type}:${poBox};${extendedAddress};${streetAddress};${locality};${region};${postalCode};${country}\n`;
	} else {
		// if all elements are empty return an empty string
		return '';
	}
}

/**
 * Generate the organization info (ORG and TITLE)
 * @param {string} org The name of the company
 * @param {string} title The job title for the vCard
 * @returns The string to add to the vCard output
 */
const vCardGenerateOrgInfo = (org, title) => {
	if (org !== '' || title !== '') {
		let orgContent = '';
		if (org !== '') {
			orgContent = `ORG:${org}\n`;
		}
		let titleContent = '';
		if (title !== '') {
			titleContent = `TITLE:${title}\n`;
		}
		return `${orgContent}${titleContent}`;
	} else {
		// if all elements are empty return an empty string
		return '';
	}
}

/**
 * Generate the phone number info (TEL)
 * @param {string} type The phone number type, split the single defining parts ones with ,
 * @param {string} phoneNumber The phone number
 * @returns The string to add to the vCard output
 */
const vCardGeneratePhoneField = (type, phoneNumber) => {
	// TEL;TYPE=cell:(123) 555-5832
	// TYPE="text,voice"
	if (phoneNumber !== '') {
		return `TEL;TYPE="${type}":${phoneNumber}\n`;
	} else {
		return '';
	}
}

/**
 * Generate the email info (EMAIL)
 * @param {string} type The email type, expected to be 'home' or 'work'
 * @param {string} email The email address
 * @returns The string to add to the vCard output
 */
const vCardGenerateEmailField = (type, email) => {
	if (email !== '') {
		return `EMAIL;TYPE=${type}:${email}\n`;
	} else {
		return '';
	}
}

/**
 * Generate the URL info (URL)
 * @param {string} type The url type, expected to be 'home' or 'work'
 * @param {string} url The url
 * @returns The string to add to the vCard output
 */
const vCardGenerateUrlField = (type, url) => {
	if (url !== '') {
		return `URL;TYPE=${type}:${url}\n`;
	} else {
		return '';
	}
}

export default generateContactFromInputs;
