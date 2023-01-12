// based on https://www.rfc-editor.org/rfc/rfc6350

const generateContactFromInputs = () => {

	// ToDo: check fields for illegal chars (e.g. ;)

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

	const orgOutput = vCardGenerateOrgInfo(
		inputCompany.value.trim(),
		inputJobTitle.value.trim()
	)

	// type work or home
	const inputContactType = document.getElementById('contactInputContactType');

	const inputStreetAndNumber = document.getElementById('contactInputStreetAndNumber');
	const inputZipCode = document.getElementById('contactInputZipCode');
	const inputCity = document.getElementById('contactInputCity');
	const inputCountry = document.getElementById('contactInputCountry');

	// ADR;TYPE=home:;;123 Main St.;Springfield;IL;12345;USA

	// TEL;TYPE=cell:(123) 555-5832
	// TYPE="text,voice"
	const inputMobile = document.getElementById('contactInputMobile');
	const inputLandline = document.getElementById('contactInputLandline');
	// EMAIL
	const inputEmail = document.getElementById('contactInputEmail');
	// URL
	const inputUrl = document.getElementById('contactInputUrl');

	// sub-elements create their own line break, that way we do not need to check here if they have content or not
	const combinedContent = `BEGIN:VCARD\nVERSION:4.0\n${outputName}${orgOutput}END:VCARD`;

	return combinedContent;
}

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
		return `FN:${fnPrefix}${fnName}\nN:${lastName};${firstName};${vCardSplitSpacesToComma(middleName)};${vCardSplitSpacesToComma(honorificPrefix)};${vCardSplitSpacesToComma(honorificSuffix)}\n`;
	} else {
		// if all elements are empty return an empty string
		return '';
	}

}

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

const vCardSplitSpacesToComma = (fieldValue) => {
	return fieldValue.split(' ').join(',');
}

export default generateContactFromInputs;
