window.onload = () => {
	const trello = window.TrelloPowerUp.iframe();
	trello.render(() => {
		document.body.innerHTML = trello.arg("description");
	});
}