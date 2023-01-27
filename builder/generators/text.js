const generateTextFromInputs = () => {
	const inputArea = document.getElementById("textQrInput");
	if (inputArea.value.trim() === '') {
		alert("No content was provided for the QR code.\nGeneration not possible...");
		return null;
	}
	return inputArea.value.trim();
}

export default generateTextFromInputs;
