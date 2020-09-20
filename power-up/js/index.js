import {
	card_back_section,
	authorization_status,
	card_buttons,
	card_detail_badges,
	show_authorization
} from "./trello/index";

TrelloPowerUp.initialize({
	"authorization-status": authorization_status,
	"card-back-section": card_back_section,
	"card-buttons": card_buttons,
	"card-detail-badges": card_detail_badges,
	"show-authorization": show_authorization
});