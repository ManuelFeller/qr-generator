const generateContactFromInputs = () => {

	// N:Stevenson;John;Philip,Paul;Dr.;Jr.,M.D.,A.C.P.
	// LastName;Firstname;MiddleName;Prefixes;Suffixes
	// Family Names (also known as surnames), Given Names, Additional Names, Honorific Prefixes, and Honorific Suffixes

	const inputTitle = document.getElementById('contactInputTitle');
	const inputFirstName = document.getElementById('contactInputFirstName');
	const inputMiddleName = document.getElementById('contactInputMiddleName');
	const inputLastName = document.getElementById('contactInputLastName');
	const inputNameSuffix = document.getElementById('contactInputNameSuffix');
	// TITLE
	const inputJobTitle = document.getElementById('contactInputJobTitle');
	// ORG
	const inputCompany = document.getElementById('contactInputCompany');

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

}

export default generateContactFromInputs;
