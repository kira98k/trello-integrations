const trello = window.TrelloPowerUp.iframe();

trello.render(() => {
	return trello.get("card", "private", "book", -1).then(book => {
		document.body.innerHTML = book.description;
	});
});