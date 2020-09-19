import { create_request, get_access_token, get_user_id } from "../goodreads";

const Promise = window.TrelloPowerUp.Promise;

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
							.then(access_token => {
								const save_access_token = trello.set("member", "private", "access_token", access_token)
								const save_user_id = get_user_id(access_token).then(user_id => {
									return trello.set("member", "private", "user_id", user_id);
								});
								return Promise.all(save_access_token, save_user_id);
							});
					}
				})
		});
}
