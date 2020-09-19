import {
	attachment_sections,
	authorization_status,
	card_buttons,
	card_detail_badges,
	show_authorization
} from "./trello/index";

TrelloPowerUp.initialize({
	"attachment-sections": attachment_sections,
	"authorization-status": authorization_status,
	"card-buttons": card_buttons,
	"card-detail-badges": card_detail_badges,
	"show-authorization": show_authorization
});