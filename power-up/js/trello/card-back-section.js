const GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

export function card_back_section(trello, options) {
	return trello.get("card", "private", "book", -1).then(book => {
		if (book === -1) {
			return null;
		}
		return {
			title: `Book Description - ${book.title}`,
			icon: GRAY_ICON,
			content: {
				type: "iframe",
				url: trello.signUrl("./description.html"),
				height: 250
			}
		};
	});
}