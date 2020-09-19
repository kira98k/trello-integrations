import { create_request, get_access_token } from "../goodreads";

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
