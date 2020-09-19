const GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

export function attachment_sections(trello, options) {
	const claimed = options.entries.filter(attachment => {
		return attachment.url.startsWith("https://www.goodreads.com/")
	})
	return trello.get("card", "private", "book", -1).then(book => {
		return [{
			id: book.title,
			claimed: claimed,
			icon: GRAY_ICON,
			title: `Book Description - ${book.title}`,
			content: {
				type: "iframe",
				url: trello.signUrl("./description.html", { description: book.description }),
				height: 250
			}
		}];
	});
}