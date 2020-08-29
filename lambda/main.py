from goodreads import goodreads


def handler(event, context):
	action = event.pop("action")
	goodreads_handler = getattr(goodreads, action)
	return goodreads_handler(**event)
