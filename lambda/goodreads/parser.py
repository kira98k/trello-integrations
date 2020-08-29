from lxml import etree


def parse_user_id(content):
	return etree.fromstring(content).xpath("//user/@id")[0]


def parse_user_books(content):
	root = etree.fromstring(content)
	books = []
	for item in root.xpath('//item'):
		book = {
			"book_id": item.xpath("book_id/text()")[0],
			"title": item.xpath("title/text()")[0],
			"author": item.xpath("author_name/text()")[0],
			"description": item.xpath("book_description/text()")[0],
			"image_url": item.xpath("book_large_image_url/text()")[0],
			"shelves": (item.xpath("user_shelves/text()") + [""])[0].split(", "),
			"pages": (item.xpath("book/num_pages/text()") + [""])[0]
		}
		if "to-read" in book["shelves"]:
			book["status"] = "to-read"
		elif "currently-reading" in book["shelves"]:
			book["status"] = "currently-reading"
		else:
			book["status"] = "read"
		books.append(book)
	return books


def parse_search_books(content):
	root = etree.fromstring(content)
	books = []
	for item in root.xpath("//best_book"):
		book = {
			"book_id": item.xpath("id/text()")[0],
			"title": item.xpath("title/text()")[0],
			"author": item.xpath("author/name/text()")[0],
			"image_url": item.xpath("image_url/text()")[0],
		}
		books.append(book)
	return books
