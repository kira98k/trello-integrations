import { create_request, get_access_token, get_books } from "./goodreads";

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
				return { authorized: true };
			}
		});
}


export function show_authorization(trello) {
	/*
	The authorization page sends a message with `data=true` when authorization succeeds.
	If authorization succeeded then try to get the saved request token.
	Get the access_token from server and save the access_token.
	*/
	window.addEventListener("message", event => {
		if (event.origin === window.location.origin && event.data === true) {
			event.stopImmediatePropagation();
			console.log("Authorization Successful.");
			trello.get("member", "private", "request_token", -1)
				.then(request_token => {
					console.log(`Request Token Found : ${request_token}`);
					return get_access_token(request_token);
				})
				.then(access_token => {
					return trello.set("member", "private", "access_token", access_token);
				})
		}
	})
	/*
	Get a request_token from server and save it.
	Open the authorization page in a pop-up window.
	*/
	create_request()
		.then(({ auth_url, request_token }) => {
			return trello.set("member", "private", "request_token", request_token)
				.then(() => {
					return { auth_url, request_token };
				});
		})
		.then(({ auth_url, request_token }) => {
			const goodreads = window.open(`./authorize.html?auth_url=${auth_url}`);
			if (!goodreads || goodreads.closed || typeof goodreads.closed === 'undefined') {
				alert("Please enabled pop-ups.");
			} else {
				goodreads.focus();
			}
			return { auth_url, request_token };
		});
}

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
					callback: (trello) => trello.alert({ message: "You clicked : " + book.title })
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