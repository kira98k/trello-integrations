import { get_books } from "../goodreads";

const GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

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
					callback: (trello) => {
						return trello.set("card", "private", "book", book)
							.then(() => trello.attach({ url: "https://www.goodreads.com/" }))
					}
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

export function attachment_sections(trello, options) {
	const claimed = options.entries.filter(attachment => {
		return attachment.url.startsWith("https://www.goodreads.com/")
	})
	return trello.get("card", "private", "book", -1).then(book => {
		return [{
			id: book.title,
			claimed: claimed,
			icon: GRAY_ICON,
			title: `Book Description - ${book.title}`,
			content: {
				type: "iframe",
				url: trello.signUrl("./description.html", { description: book.description }),
				height: 250
			}
		}];
	});
}