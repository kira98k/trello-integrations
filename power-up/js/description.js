const trello = window.TrelloPowerUp.iframe();

window.onload = () => {
	trello.render(() => {
		document.body.innerHTML = trello.arg("description");
	});
}