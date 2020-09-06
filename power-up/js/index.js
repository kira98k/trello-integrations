import { authorization_status, show_authorization } from "./trello";

TrelloPowerUp.initialize({
	"authorization-status": authorization_status,
	"show-authorization": show_authorization
});