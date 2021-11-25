from flask import Flask, make_response, request
from functools import wraps
from werkzeug.security import check_password_hash, generate_password_hash
from cs50 import SQL
import jwt
import datetime
from time import strftime

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
        return make_response({"message": "Incorrect email or password"}, 409)
    userHash = findUser[0]["password"]
    userID = findUser[0]["id"]
    username = findUser[0]["username"]
    if check_password_hash(userHash, password):
        token = jwt.encode({"userID": userID, "email": email, "username": username, "exp": datetime.datetime.utcnow(
        ) + datetime.timedelta(days=1)}, app.config["SECRET_KEY"])
        res = make_response({"userID": userID,
                            "username": username, "email": email}, 201)
        res.set_cookie("accessToken", value=token, max_age=datetime.timedelta(days=1), expires=datetime.datetime.utcnow(
        ) + datetime.timedelta(days=1))
        return res
    return make_response({"message": "Incorrect email or password"}, 409)

# TASKS APIS
# Fetch tasks API


@app.route("/tasks/fetch", methods=["GET"])
@token_required
def fetchTasks():
    token = request.cookies.get("accessToken")
    userID = jwt.decode(
        token, app.config["SECRET_KEY"], algorithms=["HS256"])["userID"]
    userTasks = db.execute(
        "SELECT * FROM taskInfo WHERE taskID in (SELECT id FROM tasks WHERE userID = ?)", userID)
    return make_response({"tasks": userTasks}, 200)

# Add task API


@app.route("/tasks/add", methods=["PUT"])
@token_required
def addTask():
    token = request.cookies.get("accessToken")
    userID = jwt.decode(
        token, app.config["SECRET_KEY"], algorithms=["HS256"])["userID"]
    title = request.form.get("title")
    text = request.form.get("text")
    taskID = db.execute("INSERT INTO tasks(userID) VALUES(?)", userID)
    db.execute("INSERT INTO taskInfo(taskID, title, text, addedOn, modifiedOn, status) VALUES(?, ?, ?, ?, ?, ?)",
               taskID, title, text, strftime('%Y-%m-%d %H:%M:%S'), strftime('%Y-%m-%d %H:%M:%S'), "0")
    addedTask = db.execute(
        "SELECT * FROM taskInfo WHERE taskID = ?", taskID)[0]
    return make_response(addedTask, 201)

# Delete task API


@app.route("/tasks/delete", methods=["DELETE"])
@token_required
def deleteTask():
    taskID = request.form.get("taskID")
    db.execute("DELETE FROM tasks WHERE id = ?", taskID)
    db.execute("DELETE FROM taskInfo WHERE taskID = ? ", taskID)
    return make_response({}, 204)

# Update task status


@app.route("/tasks/updatestatus", methods=["PATCH"])
@token_required
def updateTaskStatus():
    taskID = request.form.get("taskID")
    status = request.form.get("status")
    db.execute(
        "UPDATE taskInfo SET status = ?, modifiedOn = ? WHERE taskID = ?", status, strftime('%Y-%m-%d %H:%M:%S'), taskID)
    return make_response({"modifiedOn": strftime('%Y-%m-%d %H:%M:%S'), "taskID": taskID, "status": status}, 201)

# Update task contents


@app.route("/tasks/updatecontent", methods=["PATCH"])
@token_required
def updateTaskContent():
    taskID = request.form.get("taskID")
    title = request.form.get("title")
    text = request.form.get("text")
    db.execute(
        "UPDATE taskInfo SET title = ?, text = ?, modifiedOn = ? WHERE taskID = ?", title, text, strftime('%Y-%m-%d %H:%M:%S'), taskID)
    updatedTask = db.execute(
        "SELECT * FROM taskInfo WHERE taskID = ?", taskID)[0]
    return make_response(updatedTask, 200)

# PROFILE API
# Update profile info


@app.route("/profile/updateinfo", methods=["PATCH"])
@token_required
def profile():
    token = request.cookies.get("accessToken")
    userID = jwt.decode(
        token, app.config["SECRET_KEY"], algorithms=["HS256"])["userID"]
    user = db.execute("SELECT * FROM users WHERE id = ?", userID)[0]
    userHash = user["password"]
    if request.form.get("type") == "updateInfo":
        username = request.form.get("username")
        email = request.form.get("email")
        currentPassword = request.form.get("currentPassword")
        if check_password_hash(userHash, currentPassword):
            db.execute("UPDATE users SET username = ?, email = ? WHERE id = ?",
                       username, email, userID)
            updatedUser = db.execute(
                "SELECT * FROM users WHERE id = ?", userID)[0]

            token = jwt.encode({"userID": userID, "email": updatedUser["email"], "username": updatedUser["username"], "exp": datetime.datetime.utcnow(
            ) + datetime.timedelta(hours=24)}, app.config["SECRET_KEY"])
            res = make_response({"userID": userID,
                                "username": updatedUser["username"], "email": updatedUser["email"]}, 201)
            res.set_cookie("accessToken", value=token, max_age=datetime.timedelta(days=1), expires=datetime.datetime.utcnow(
            ) + datetime.timedelta(days=1))

            return res
        else:
            return make_response({"message": "The password you entered is incorrect."}, 409)

# Change user password


@app.route("/profile/changepassword", methods=["PATCH"])
@token_required
def changePassword():
    token = request.cookies.get("accessToken")
    userID = jwt.decode(
        token, app.config["SECRET_KEY"], algorithms=["HS256"])["userID"]
    user = db.execute("SELECT * FROM users WHERE id = ?", userID)[0]
    userHash = user["password"]
    oldPassword = request.form.get("oldPassword")
    newPassword = request.form.get("newPassword")
    if check_password_hash(userHash, oldPassword):
        if oldPassword == newPassword:
            return make_response({"message": "The password you entered is already your current password."}, 409)
        else:
            db.execute("UPDATE users SET password = ?",
                       generate_password_hash(newPassword))
            return make_response({}, 201)
    else:
        return make_response({"message": "The password you entered is incorrect."}, 409)


if __name__ == "__main__":
    app.run(debug=True)
