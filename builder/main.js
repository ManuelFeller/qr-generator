import './style.css';
import QrEncoder from "qr-encoder";
import generateContactFromInputs from './generators/contact';
import generateTextFromInputs from './generators/text';
import generateLinkFromInputs from './generators/link';

const qrTypes = [
	{id: "text", contentGenerator: generateTextFromInputs },
	{id: "link", contentGenerator: generateLinkFromInputs },
	{id: "email"},
	{id: "geo"},
	{id: "wifi"},
	{id: "sms"},
	{id: "phone"},
	{id: "event"},
	{id: "contact", contentGenerator: generateContactFromInputs},
];
// will be set on init
let selectedQrMode = undefined;


const performEncode = () => {
	saveButton.disabled = true;
	const canvas = document.getElementById("output");
	const canvasContext = canvas.getContext("2d");
	canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
	// const inputArea = document.getElementById("input");
	// if (inputArea.value.trim() === '') {
	// 	alert("No content was provided for the QR code.\nGeneration not possible...");
	// 	return;
	// }

	let qrContent = null;
	if (selectedQrMode.contentGenerator === undefined) {
		alert('No generator defined for QR Code Type!');
		return;
	} else {
		qrContent = selectedQrMode.contentGenerator();
		if (qrContent === null) {
			return;
		}
	}

	const errorCorrectionSelect = document.getElementById("errorCorrection");
	const pixelSizeSelect = document.getElementById("pixelSize");
	const foregroundColorSelect = document.getElementById("foregroundColor");
	const backgroundColorSelect = document.getElementById("backgroundColor");
	const bitMatrix = QrEncoder.encode(qrContent, errorCorrectionSelect.value);
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



const activateInputDiv = (selectedType) => {
	qrTypes.forEach(qrType => {
		const elementInputDiv = document.getElementById(qrType.id + 'Inputs');
		if (qrType.id === selectedType) {
			elementInputDiv.style.display = "block";
			selectedQrMode = qrType;
		} else {
			elementInputDiv.style.display = "none";
		}
	});
}

const generateButton = document.getElementById('runEncoder');
generateButton.addEventListener('click', performEncode);

const saveButton = document.getElementById('imageSaver');
saveButton.addEventListener('click', downloadCanvasAsImage);

const typeSelection = document.getElementById('typeOfCode');
typeSelection.addEventListener('change', updateSelectedQrType);

activateInputDiv(typeSelection.value);

