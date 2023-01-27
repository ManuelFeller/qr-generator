const generateLinkFromInputs = () => {
	const typeSelector = document.getElementById("linkQrProtocol");
	const urlInput = document.getElementById("linkQrUrl");
	if (urlInput.value.trim() === '') {
		alert("No content was provided for the QR code.\nGeneration not possible...");
		return null;
	}
	if (typeSelector.value.trim().toLowerCase() === 'http') {
		return 'http://' +  urlInput.value.trim();
	}
	else if (typeSelector.value.trim().toLowerCase() === 'https') {
		return 'https://' +  urlInput.value.trim();
	}
	else {
		return urlInput.value.trim();
	}
}

export default generateLinkFromInputs;
