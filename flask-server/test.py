import requests

BASE = "http://127.0.0.1:5000/"

response = requests.post(
    BASE + "register", {"username": "test2", "password": "test", "confPassword": "test", "email": "test12"})
print(response.json())
