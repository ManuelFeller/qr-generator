const generateCoordinatesFromInputs = () => {
	const inputLon = document.getElementById("geoQrLon");
	const inputLat = document.getElementById("geoQrLat");

	// comma needs to become . (as it is separator)

	if (inputLon.value.trim() === '' || inputLat.value.trim() === '') {
		alert("Missing content (at least one value) for the QR code.\nGeneration not possible...");
		return null;
	}
	if (inputLon.value.trim() === '0' || inputLat.value.trim() === '0' ) {
		if (!confirm("It seems you missed at least one coordinate.\nDo you really want to generate the code?")) {
			return null;
		}
	}
	// read values and make sure that the decimal separator is set to the correct one (which is a .)
	let lat = inputLat.value.trim().replace(',', '.');
	let lon = inputLon.value.trim().replace(',', '.');

	return `geo:${lat},${lon}`;
}

export default generateCoordinatesFromInputs;
