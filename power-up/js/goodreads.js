import axios from "axios";

const BASE_URL = process.env.BASE_URL;

function postData(data) {
	return axios.post(BASE_URL, data).then(response => response.data);
}

export function create_request() {
	return postData({ "action": "create_request" });
}

export function get_access_token(request_token) {
	return postData({ "action": "get_access_token", "request_token": request_token })
		.then(({ access_token }) => access_token);
}

export function get_user_id(access_token) {
	return postData({ "action": "get_user_id", "access_token": access_token })
}

export function get_books(access_token) {
	return postData({ "action": "get_books", "access_token": access_token });
}

export function search_books(access_token, query) {
	return postData({ "action": "search_books", "access_token": access_token, "query": query });
}

export function add_to_shelf(access_token, book_id, shelf = "to-read") {
	return postData({ "action": "add_to_shelf", "access_token": access_token, "book_id": book_id, "shelf": shelf })
}