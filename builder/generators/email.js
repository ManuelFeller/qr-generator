const generateEmailFromInputs = () => {
	const emailInput = document.getElementById("emailQrAddress");
	const subjectInput = document.getElementById("emailQrSubject");
	const bodyInput = document.getElementById("emailQrBody");
	if (emailInput.value.trim() === '') {
		alert("No content was provided for the QR code.\nGeneration not possible...");
		return null;
	}
	if (subjectInput.value.trim() === '' && bodyInput.value.trim() === '') {
		return 'mailto:' + emailInput.value.trim();
	} else {
		let linkData = 'mailto:' + emailInput.value.trim() + '?';
		let addCount = 0;
		if (subjectInput.value.trim() !== '') {
			addCount++;
			linkData += 'subject=' + encodeURIComponent(subjectInput.value.trim());
		}
		if (bodyInput.value.trim() !== '') {
			if (addCount > 0) {
				linkData += '&';
			}
			addCount++;
			linkData += 'body=' + encodeURIComponent(bodyInput.value.trim());
		}
		return linkData;
	}
}

export default generateEmailFromInputs;
