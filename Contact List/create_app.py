from flask import Flask
from flask_wtf.csrf import CSRFProtect

csrf = CSRFProtect()


def create_app(secret_key):
    """Instantiates a flask app"""
    app = Flask(__name__)
    app.config["SECRET_KEY"] = secret_key
    csrf.init_app(app)
    return app
