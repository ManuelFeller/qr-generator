import './style.css';
import QrEncoder from "qr-encoder";


const qrTypes = [
	{id: "text"},
	{id: "link"},
	{id: "email"},
	{id: "geo"},
	{id: "wifi"},
	{id: "sms"},
	{id: "phone"},
	{id: "event"},
	{id: "contact"},
];


const performEncode = () => {
	saveButton.disabled = true;
	const canvas = document.getElementById("output");
	const canvasContext = canvas.getContext("2d");
	canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
	const inputArea = document.getElementById("input");
	if (inputArea.value.trim() === '') {
		alert("No content was provided for the QR code.\nGeneration not possible...");
		return;
	}
	const errorCorrectionSelect = document.getElementById("errorCorrection");
	const pixelSizeSelect = document.getElementById("pixelSize");
	const foregroundColorSelect = document.getElementById("foregroundColor");
	const backgroundColorSelect = document.getElementById("backgroundColor");
	const bitMatrix = QrEncoder.encode(inputArea.value.trim(), errorCorrectionSelect.value);
	const pixelSize = parseInt(pixelSizeSelect.value, 10);
	const transparentBackground = false;
	canvasContext.canvas.width = (bitMatrix.length * pixelSize) + (2 * pixelSize);
	canvasContext.canvas.height = (bitMatrix.length * pixelSize) + (2 * pixelSize);
	if (!transparentBackground) {
		canvasContext.fillStyle = backgroundColorSelect.value;
		canvasContext.fillRect(
			0,
			0,
			canvasContext.canvas.width,
			canvasContext.canvas.height
		);
	}

	for (let row = 0; row < bitMatrix.length; row++) {
		for (let column = 0; column < bitMatrix[row].length; column++) {
			if (bitMatrix[row][column] === 1) {
				canvasContext.fillStyle = foregroundColorSelect.value;
				canvasContext.fillRect(
					(row * pixelSize) + pixelSize,
					(column * pixelSize) + pixelSize,
					pixelSize,
					pixelSize
				);
			} else {
				if (!transparentBackground) {
					canvasContext.fillStyle = backgroundColorSelect.value;
					canvasContext.fillRect(
						(row * pixelSize) + pixelSize,
						(column * pixelSize) + pixelSize,
						pixelSize,
						pixelSize
					);
				}
			}
		}
	}
	saveButton.disabled = false;
}

const downloadCanvasAsImage = () => {
	const downloadLink = document.createElement('a');
	const canvas = document.getElementById('output');
	downloadLink.setAttribute('download', 'qrcode.png');
	canvas.toBlob(function(blob) {
		const url = URL.createObjectURL(blob);
		downloadLink.setAttribute('href', url);
		downloadLink.click();
	});
}

const updateSelectedQrType = (event) => {
	activateInputDiv(event.target.value);
}

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

const activateInputDiv = (selectedType) => {
	qrTypes.forEach(element => {
		const elementInputDiv = document.getElementById(element.id + 'Inputs');
		if (element.id === selectedType) {
			elementInputDiv.style.display = "block";
		} else {
			elementInputDiv.style.display = "none";
		}
	});
}

const generateButton = document.getElementById('runEncoder');
generateButton.addEventListener('click', performEncode);

const saveButton = document.getElementById('imageSaver');
saveButton.addEventListener('click', downloadCanvasAsImage);

const typeSelction = document.getElementById('typeOfCode');
typeSelction.addEventListener('change', updateSelectedQrType);

activateInputDiv(typeSelction.value);

