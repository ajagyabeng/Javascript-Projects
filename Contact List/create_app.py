from flask import Flask


def create_app(secret_key):
    app = Flask(__name__)
    app.config["SECRET_KEY"] = secret_key
    return app