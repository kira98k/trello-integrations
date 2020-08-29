import json

from goodreads import goodreads


def main_handler(event, context):
	action = event.pop("action")
	handler = getattr(goodreads, action)
	body = handler(**event)
	return {
		"statusCode": 200,
		"body": json.dumps(body)
	}
