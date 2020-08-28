from urllib.parse import urljoin

NAME = "goodreads"
BASE_URL = "https://www.goodreads.com/"
OAUTH_URL = urljoin(BASE_URL, "oauth/")
AUTHORIZE_URL = urljoin(OAUTH_URL, "authorize")
REQUEST_TOKEN_URL = urljoin(OAUTH_URL, "request_token")
ACCESS_TOKEN_URL = urljoin(OAUTH_URL, "access_token")

DELIMITER = "|"

GET_USER_URL = "https://www.goodreads.com/api/auth_user"
GET_BOOKS_URL = "https://www.goodreads.com/review/list_rss/{user_id}"
SEARCH_BOOKS_URL = "https://www.goodreads.com/search/index.xml"
