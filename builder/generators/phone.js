const generatePhoneFromInputs = () => {
	const inputPhone = document.getElementById("phoneQrNumber");
	if (inputPhone.value.trim() === '') {
		alert("No content was provided for the QR code.\nGeneration not possible...");
		return null;
	}
	return `tel:${inputPhone.value.trim()}`;
}

export default generatePhoneFromInputs;
