from cryptography.fernet import Fernet
from .constants import DELIMITER


def encrypt(data: str, secret: str, encoding="utf-8") -> str:
	fernet = Fernet(secret.encode(encoding))
	data_bytes = data.encode(encoding)
	encrypted_bytes = fernet.encrypt(data_bytes)
	return encrypted_bytes.decode(encoding)


def decrypt(data: str, secret: str, encoding="utf-8") -> str:
	fernet = Fernet(secret.encode(encoding))
	data_bytes = data.encode(encoding)
	decrypted_bytes = fernet.decrypt(data_bytes)
	return decrypted_bytes.decode(encoding)


def encrypt_token(token: str, token_secret: str, secret: str) -> str:
	return encrypt(token + DELIMITER + token_secret, secret)


def decrypt_token(token: str, secret: str) -> (str, str):
	return decrypt(token, secret).split(DELIMITER)
