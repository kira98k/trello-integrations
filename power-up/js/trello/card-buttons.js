import { add_to_shelf, get_books, search_books } from "../goodreads";
import { call_with_access_token } from "./utils";

function get_books_callback(trello) {
	return call_with_access_token(trello, get_books, [])
		.then(books => {
			return books.map(book => {
				return {
					text: book.title,
					callback: (trello) => trello.set("card", "private", "book", book)
				};
			});
		});
}

function search_books_callback(trello, options) {
	return call_with_access_token(trello, access_token => search_books(access_token, options.search), [])
		.then(books => {
			return books.map(book => {
				return {
					text: `${book.title} - ${book.author}`,
					callback: trello => {
						return call_with_access_token(trello, access_token => add_to_shelf(access_token, book.book_id), false)
							.then(status => {
								if (status) {
									trello.alert({ message: `Successfully added ${book.title} to shelf` })
									console.log(trello.getContext());
								} else {
									trello.alert({ message: `Failed to add ${book.title} to shelf` })
								}
								trello.closePopup();
							})
					}
				}
			})
		})
}

export function card_buttons() {
	return [
		{
			text: "Your Books",
			callback: trello => trello.popup({ title: "Your Books", items: get_books_callback })
		},
		{
			text: "Search Books",
			callback: trello => trello.popup({
				title: "Search Books",
				items: search_books_callback,
				search: { count: 10 }
			})
		}
	];
}
