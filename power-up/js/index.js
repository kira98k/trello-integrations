import { authorization_status, show_authorization, card_buttons } from "./trello";

TrelloPowerUp.initialize({
	"authorization-status": authorization_status,
	"show-authorization": show_authorization,
	"card-buttons": card_buttons
});