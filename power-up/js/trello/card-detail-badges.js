export function card_detail_badges(trello) {
	return trello.get("card", "private", "book", -1)
		.then(book => {

			if (book === -1) {
				return [];
			}
			return book.shelves.map(shelf => {
				return {
					title: "Shelves",
					text: shelf,
				}
			})
		});
}