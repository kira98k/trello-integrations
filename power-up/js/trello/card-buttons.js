import { get_books } from "../goodreads";

function get_books_popup(trello) {
	return trello.get("member", "private", "access_token", -1)
		.then(access_token => {
			if (access_token === -1) {
				return trello.alert({ message: "User not authorized yet." })
					.then(() => []);
			} else {
				return get_books(access_token);
			}
		})
		.then(books => {
			let items = [];
			books.forEach(book => {
				items.push({
					text: book.title,
					callback: (trello) => trello.set("card", "private", "book", book)
				})
			})
			console.log("Received Items : " + JSON.stringify(items));
			return items;
		});
}

export function card_buttons() {
	return [{
		text: 'Your Books',
		callback: (trello) => {
			return trello.popup({
				title: "Your Books",
				items: get_books_popup
			})
		}
	}];
}
