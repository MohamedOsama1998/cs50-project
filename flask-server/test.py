import requests
import jwt

BASE = "http://127.0.0.1:5000/"

response = requests.post(
    BASE + "login", {"password": "test", "email": "test12"})
print(response.json())
