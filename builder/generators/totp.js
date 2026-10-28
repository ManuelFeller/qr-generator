const generateTotpFromInputs = () => {
	const totpIssuer = document.getElementById("totpQrIssuer");
	const totpAccount = document.getElementById("totpQrAccount");
	const totpSecret = document.getElementById("totpQrSecret");
	if (totpIssuer.value.trim() === '') {
		alert("No content was provided for the Issuer.\nGeneration not possible...");
		return null;
	}
	if (totpAccount.value.trim() === '') {
		alert("No content was provided for the Account.\nGeneration not possible...");
		return null;
	}
	if (totpSecret.value.trim() === '') {
		alert("No content was provided for the Secret.\nGeneration not possible...");
		return null;
	}
	let linkData = 'otpauth://totp/' + totpIssuer.value.trim() + ':' + totpAccount.value.trim() + '?secret=' + totpSecret.value.trim() + '&issuer=' + totpIssuer.value.trim();
	return linkData;
}

export default generateTotpFromInputs;
