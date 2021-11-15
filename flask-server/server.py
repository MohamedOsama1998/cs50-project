from flask import Flask, make_response
from flask_restful import Api, Resource, reqparse
from werkzeug.security import check_password_hash, generate_password_hash
from cs50 import SQL
import jwt
import datetime
# from time import strftime

# Setup App
app = Flask(__name__)
app.config["SECRET_KEY"] = "secretKey"
api = Api(app)
db = SQL("sqlite:///database.db")

# Register API
user_register_args = reqparse.RequestParser()
user_register_args.add_argument(
    "username", type=str, help="Username is missing", required=True)
user_register_args.add_argument(
    "password", type=str, help="Password is missing", required=True)
user_register_args.add_argument(
    "confPassword", type=str, help="Passowrd confirm is missing", required=True)
user_register_args.add_argument(
    "email", type=str, help="Email is missing", required=True)


class Register(Resource):
    def post(self):
        args = user_register_args.parse_args()
        findUser = db.execute(
            "SELECT * FROM users WHERE email = ?", args.email)
        if len(findUser) != 0:
            return make_response({"message": "Email already in use"}, 409)
        userID = db.execute("INSERT INTO users (username, password, email) VALUES(?, ?, ?)",
                            args.username, generate_password_hash(args.password), args.email)
        token = jwt.encode({"user": args.username, "exp": datetime.datetime.utcnow(
        ) + datetime.timedelta(hours=24)}, app.config["SECRET_KEY"])
        return make_response({"accessToken": token, "userID": userID}, 201)


api.add_resource(Register, "/register")

if __name__ == "__main__":
    app.run(debug=True)
