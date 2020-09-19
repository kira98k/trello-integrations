import { create_request, get_access_token, get_books } from "./goodreads";

const GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';
const GOODREADS_BOOK_URL = "https://www.goodreads.com/book/show/";

export function authorization_status(trello) {
	/*
	Read access token from trello saved data. Return true if present.
	 */
	console.log("Running authorization status.")
	return trello.get("member", "private", "access_token", -1)
		.then(access_token => {
			if (access_token === -1) {
				console.log("Access Token not found.");
				return { authorized: false };
			} else {
				console.log(`Access Token Found : ${access_token}`)
				return { authorized: true, access_token: access_token };
			}
		});
}


export function show_authorization(trello) {
	/*
	Get a request_token from server and save it.
	Open the authorization page in a pop-up window.
	*/
	create_request()
		.then(({ auth_url, request_token }) => {
			console.log(`Created Request Token : ${request_token}`);
			return trello.set("member", "private", "request_token", request_token)
				.then(() => {
					return { auth_url, request_token };
				});
		})
		.then(({ auth_url, request_token }) => {
			console.log(`Opening Authorization Popup : ${auth_url}`)
			return trello.authorize(auth_url)
				.then((authorized) => {
					if (authorized === "1") {
						console.log("Authorized")
						return get_access_token(request_token)
							.then(access_token => trello.set("member", "private", "access_token", access_token));
					}
				})
		});
}

export function get_books_popup(trello) {
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
						console.log(`Saving book "${book.title}" on card titled : ${trello.card}`)
						trello.set("card", "private", "book", book)
							.then(() => trello.attach({ name: book.title, url: GOODREADS_BOOK_URL + book.book_id }))
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
	const claimed = options.entries.filter((attachment) => {
		return attachment.url.indexOf("https://www.goodreads.com/book/show/") === 0;
	});
	if (claimed && claimed.length === 1) {
		return trello.get("card", "private", "book", -1).then(book => {
			const attachment = claimed[0];
			return [{
				id: attachment.name,
				claimed: claimed,
				icon: GRAY_ICON,
				title: `Book Description - ${attachment.name}`,
				content: {
					type: "iframe",
					url: trello.signUrl("./description.html", { description: book.description }),
					height: 250
				}
			}];
		});
	}
	return [];
}