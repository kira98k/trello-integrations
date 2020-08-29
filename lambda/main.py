import json

from goodreads import goodreads


def handler(event, context):
	action = event.pop("action")
	goodreads_handler = getattr(goodreads, action)
	body = goodreads_handler(**event)
	return {
		"statusCode": 200,
		"body": json.dumps(body)
	}
