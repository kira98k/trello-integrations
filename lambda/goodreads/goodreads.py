from rauth.service import OAuth1Service, OAuth1Session

from . import parser
from .constants import *
from .secrets import GOODREADS_API_KEY, GOODREADS_API_SECRET, SECRET
from .utils import encrypt_token, decrypt_token

client = OAuth1Service(consumer_key=GOODREADS_API_KEY, consumer_secret=GOODREADS_API_SECRET,
	name=NAME, base_url=BASE_URL, authorize_url=AUTHORIZE_URL,
	request_token_url=REQUEST_TOKEN_URL, access_token_url=ACCESS_TOKEN_URL)


def _create_session(access_token):
	access_token, access_token_secret = decrypt_token(access_token, SECRET)
	session = OAuth1Session(consumer_key=GOODREADS_API_KEY, consumer_secret=GOODREADS_API_SECRET,
		access_token=access_token, access_token_secret=access_token_secret)
	return session


def create_request():
	request_token, request_token_secret = client.get_request_token(header_auth=True)
	encrypted_request_token = encrypt_token(request_token, request_token_secret, SECRET)
	auth_url = client.get_authorize_url(request_token)
	return {"request_token": encrypted_request_token, "auth_url": auth_url}


def get_access_token(request_token):
	request_token, request_token_secret = decrypt_token(request_token, SECRET)
	session = client.get_auth_session(request_token, request_token_secret)
	encrypted_access_token = encrypt_token(session.access_token, session.access_token_secret, SECRET)
	return {"access_token": encrypted_access_token}


def _get_user_id(access_token):
	session = _create_session(access_token)
	response = session.get(GET_USER_URL)
	return parser.parse_user_id(response.content)


def get_books(access_token):
	session = _create_session(access_token)
	user_id = _get_user_id(access_token)
	response = session.get(GET_BOOKS_URL.format(user_id=user_id))
	return parser.parse_user_books(response.content)


def search_books(access_token, query):
	session = _create_session(access_token)
	response = session.get(SEARCH_BOOKS_URL, params={'q': query})
	return parser.parse_search_books(response.content)
