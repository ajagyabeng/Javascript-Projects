from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import find_dotenv, load_dotenv
import os

# Find environment variables
dotenv_path = find_dotenv()
load_dotenv(dotenv_path)

# Database
db = SQLAlchemy()
migrate = Migrate()
db_path = os.getenv("DB_PATH")


def setup_db(app):
    """sets up and configure db with the flask app and migrations"""
    app.config['SQLALCHEMY_DATABASE_URI'] = db_path
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    migrate.init_app(app, db)


def create_tables(app):
    """creates tables in database"""
    with app.app_context():
        db.create_all()


def add_to_db(data):
    contact = Contact(name=data["name"].capitalize(),
                      phone=data["phone"], email=data["email"])
    db.session.add(contact)
    db.session.commit()


class Contact(db.Model):
    __tablename__ = "contacts"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    phone = db.Column(db.String, unique=True)
    email = db.Column(db.String)
