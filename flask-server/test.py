import requests
import jwt

BASE = "http://127.0.0.1:5000/"

response = requests.post(
    BASE + "register", {"username": "test2", "password": "test", "confPassword": "test", "email": "test12"})
print(response.json())

response = requests.post(BASE, {
    "access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOjIsImV4cCI6MTYzNjk4NTA4Nn0.YFhuoOgLLgsyCh4jLT8_tpRGzuEtQooF_kVJSPwlv2Q"})
print(response.json())
