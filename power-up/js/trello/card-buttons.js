import { add_to_shelf, get_book, get_books, get_shelves, search_books } from "../goodreads";
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

function added_to_shelf_callback(trello, book, status) {
	if (status) {
		trello.alert({ message: `Successfully added ${book.title} to shelf` })
		return call_with_access_token(trello, access_token => get_book(access_token, book.book_id), -1)
			.then(book => {
				if (book !== -1) {
					return trello.set("card", "private", "book", book);
				}
			});
	} else {
		trello.alert({ message: `Failed to add ${book.title} to shelf` })
	}
	trello.closePopup();
}

function search_books_callback(trello, options) {
	return call_with_access_token(trello, access_token => search_books(access_token, options.search), [])
		.then(books => {
			return books.map(book => {
				return {
					text: `${book.title} - ${book.author}`,
					callback: trello => {
						return call_with_access_token(trello, access_token => add_to_shelf(access_token, book.book_id), false)
							.then(status => added_to_shelf_callback(trello, book, status))
					}
				}
			})
		})
}

function get_shelves_callback(trello) {
	return call_with_access_token(trello, get_shelves, [])
		.then(shelves => {
			return shelves.map(shelf => {
				return {
					text: shelf,
					callback: trello => {
						return trello.get("card", "private", "book", -1)
							.then(book => {
								return call_with_access_token(trello, access_token => add_to_shelf(access_token, book.book_id, shelf), false)
									.then(status => added_to_shelf_callback(trello, book, status))
							})

					}
				}
			})
		})
}

export function card_buttons(trello) {
	const buttons = [
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
	return trello.get("card", "private", "book", -1)
		.then(book => {
			if (book !== -1) {
				buttons.push({
					text: "Shelves",
					callback: trello => trello.popup({
						title: "Shelves",
						items: get_shelves_callback,
						search: { count: 10 }
					})
				})
			}
			return buttons;
		})
}
