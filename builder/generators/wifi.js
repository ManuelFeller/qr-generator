const generateWifiFromInputs = () => {
	const inputEncryption = document.getElementById("wifiQrEncryption");
	const inputSsid = document.getElementById("wifiQrSsid");
	const inputPassword = document.getElementById("wifiQrPass");
	const inputHidden = document.getElementById("wifiQrHidden");
	if (inputSsid.value.trim() === '') {
		alert("No SSID was provided for the QR code.\nGeneration not possible...");
		return null;
	}
	if (inputEncryption.value.trim() !== 'none' && (inputPassword.value) === '') {
		alert("No Password was provided for the encrypted network.\nQR Generation not possible...");
		return null;
	}
	let encryption = 'T:';
	let password = 'P:';
	switch (inputEncryption.value) {
		case 'wep':
			encryption += 'WEP';
			password += inputPassword.value;
			break;
		case 'wpa':
			encryption += 'WPA';
			password += inputPassword.value;
			break;
	}
	let hidden = 'H:false';
	if (inputHidden.checked) {
		hidden = hidden = 'H:true';
	}
	//let codeContent = 'WIFI:
	return `WIFI:S:${inputSsid.value.trim()};${encryption};${password};${hidden};;`;
}

export default generateWifiFromInputs;
