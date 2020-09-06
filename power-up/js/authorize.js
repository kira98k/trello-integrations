window.onload = function () {
	const params = new URLSearchParams(window.location.search);
	const auth_url = params.get("auth_url");
	const authorized = params.get("authorize");
	if (auth_url !== null) {
		window.location.replace(auth_url);
	} else if(window.opener != null) {
		window.opener.postMessage((authorized === "1"));
		window.close();
	}
}