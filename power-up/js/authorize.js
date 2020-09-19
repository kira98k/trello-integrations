window.onload = () => {
	const params = new URLSearchParams(window.location.search);
	window.localStorage.removeItem("token");
	window.localStorage.setItem("token", params.get("authorize"));
	setTimeout(() => window.close(), 1000);
}