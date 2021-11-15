from flask import Flask, make_response, request
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
        token = request.form.get("access-token")

        if not token:
            return make_response({"message": "Access token is not provided"}, 403)

        try:
            data = jwt.decode(
                token, app.config["SECRET_KEY"], algorithms=["HS256"])
        except:
            return make_response({"message": "Access token is invalid"}, 403)

        return f(*args, **kwargs)
    return decorated


# Register API
@app.route("/register", methods=["POST"])
def register():
    username = request.form.get("username")
    password = request.form.get("password")
    email = request.form.get("email")
    findUser = db.execute(
        "SELECT * FROM users WHERE email = ?", email)
    if len(findUser) != 0:
        return make_response({"message": "Email already in use"}, 409)
    userID = db.execute("INSERT INTO users (username, password, email) VALUES(?, ?, ?)",
                        username, generate_password_hash(password), email)
    token = jwt.encode({"userID": userID, "exp": datetime.datetime.utcnow(
    ) + datetime.timedelta(hours=24)}, app.config["SECRET_KEY"])
    return make_response({"access-token": token, "userID": userID}, 201)


if __name__ == "__main__":
    app.run(debug=True)
