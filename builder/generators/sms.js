const generateSmsFromInputs = () => {
	const inputPhone = document.getElementById("smsQrNumber");
	const inputMessage = document.getElementById("smsQrMessage");
	if (inputPhone.value.trim() === '' || inputMessage.value.trim() === '') {
		alert("No content was provided for the QR code.\nGeneration not possible...");
		return null;
	}
	return `smsto:${inputPhone.value.trim()}:${inputMessage.value.trim()}`;
}

export default generateSmsFromInputs;
