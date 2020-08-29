from xml.etree import ElementTree as ETree


def parse_user_id(content):
	return ETree.fromstring(content).findall("user")[0].get("id")


def parse_user_books(content):
	root = ETree.fromstring(content)
	books = []
	for item in root.findall('channel/item'):
		book = {
			"book_id": item.findall("book_id")[0].text,
			"title": item.findall("title")[0].text,
			"author": item.findall("author_name")[0].text,
			"description": item.findall("book_description")[0].text,
			"image_url": item.findall("book_large_image_url")[0].text,
			"shelves": (item.findall("user_shelves")[0].text or "").split(", "),
			"pages": (item.findall("book/num_pages")[0].text or "")
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
	root = ETree.fromstring(content)
	books = []
	for item in root.findall("search/results/work/best_book"):
		book = {
			"book_id": item.findall("id")[0].text,
			"title": item.findall("title")[0].text,
			"author": item.findall("author/name")[0].text,
			"image_url": item.findall("image_url")[0].text,
		}
		books.append(book)
	return books
