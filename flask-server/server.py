from flask import Flask, make_response, request, redirect
from functools import wraps
from werkzeug.security import check_password_hash, generate_password_hash
from cs50 import SQL
import jwt
import datetime
# from time import strftime

# Setup App
app = Flask(__name__)
db = SQL("sqlite:///database.db")

app.config["SECRET_KEY"] = "secretKey"


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get("accessToken")

        if not token:
            return make_response({"message": "You are not allowed to visit this page"}, 403)

        try:
            data = jwt.decode(
                token, app.config["SECRET_KEY"], algorithms=["HS256"])
        except:
            return make_response({"message": "Access token is invalid"}, 403)

        return f(*args, **kwargs)
    return decorated

# AUTH APIS
# Register API


@app.route("/register", methods=["POST"])
def register():
    username = request.form.get("username")
    password = request.form.get("password")
    email = request.form.get("email")
    findUser = db.execute(
        "SELECT * FROM users WHERE email = ?", email)
    if len(findUser) != 0:
        return make_response({"message": "This E-mail is already in use"}, 409)
    userID = db.execute("INSERT INTO users (username, password, email) VALUES(?, ?, ?)",
                        username, generate_password_hash(password), email)
    token = jwt.encode({"userID": userID, "email": email, "username": username, "exp": datetime.datetime.utcnow(
    ) + datetime.timedelta(hours=24)}, app.config["SECRET_KEY"])
    res = make_response({"userID": userID,
                         "username": username, "email": email}, 201)
    res.set_cookie("accessToken", value=token, max_age=datetime.timedelta(days=1), expires=datetime.datetime.utcnow(
    ) + datetime.timedelta(days=1))
    return res

# Login API


@app.route("/login", methods=["POST"])
def login():
    password = request.form.get("password")
    email = request.form.get("email")
    findUser = db.execute(
        "SELECT * FROM users WHERE email = ?", email)
    if len(findUser) == 0:
        return make_response({"message": "Incorrect email or password"}, 404)
    userHash = findUser[0]["password"]
    userID = findUser[0]["id"]
    username = findUser[0]["username"]
    if check_password_hash(userHash, password):
        token = jwt.encode({"userID": userID, "email": email, "username": username, "exp": datetime.datetime.utcnow(
        ) + datetime.timedelta(hours=24)}, app.config["SECRET_KEY"])
        res = make_response({"userID": userID,
                            "username": username, "email": email}, 201)
        res.set_cookie("accessToken", value=token, max_age=datetime.timedelta(days=1), expires=datetime.datetime.utcnow(
        ) + datetime.timedelta(days=1))
        return res
    return make_response({"message": "Incorrect email or password"}, 409)

# TASKS APIS
# Add task:


@app.route("/addtask", methods=["PUT"])
@token_required
def addTask():
    token = request.cookies.get("accessToken")
    userID = jwt.decode(
        token, app.config["SECRET_KEY"], algorithms=["HS256"])["userID"]
    return {"ID": userID}


if __name__ == "__main__":
    app.run(debug=True)
