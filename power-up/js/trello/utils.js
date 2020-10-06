export function call_with_access_token(trello, callback, default_value) {
	return trello.get("member", "private", "access_token", -1)
		.then(access_token => {
			if (access_token === -1) {
				return trello.alert({ message: "User not authorized yet." })
					.then(() => default_value);
			}
			return callback(access_token);
		})
}
