import {
	authorization_status,
	show_authorization,
	card_buttons,
	attachment_sections
} from "./trello/index";

TrelloPowerUp.initialize({
	"attachment-sections": attachment_sections,
	"authorization-status": authorization_status,
	"show-authorization": show_authorization,
	"card-buttons": card_buttons
});