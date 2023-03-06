from flask import Flask, render_template, request, redirect, url_for
from models import setup_db, create_tables, Contact, add_to_db, delete_from_db
from dotenv import find_dotenv, load_dotenv
import requests
import time

app = Flask(__name__)
setup_db(app)

create_tables(app)


@app.route("/")
def home():
    """Renders the home page of the app."""
    return render_template("index.html")


def format_contacts(contacts):
    """Formats contacts from the database. Returns a list of contact dicts"""
    contact_list = []
    for contact in contacts:
        contact_list.append({
            "id": contact.id,
            "name": contact.name,
            "phone": contact.phone,
        })
    return contact_list


@app.route("/contacts")
def get_contacts():
    """
    retrieves contacts from database.
    returns: a list of contact objects
    """
    contacts = Contact.query.all()
    if contacts:
        return {"contacts": format_contacts(contacts)}
    return {"message": "No contacts saved."}


@app.route("/add", methods=["GET", "POST"])
def add_contact():

    if request.method == "POST":
        data = request.form.to_dict()
        try:
            add_to_db(data)
            phone = data["phone"]
            return redirect(url_for("view_contact", phone=phone))
        except:
            return {"message": "Unable to add to database"}
    return render_template("add_contact.html")


@app.route("/person")
def view_contact():
    phone = request.args.get("phone")
    person = Contact.query.filter_by(phone=phone).first()
    return render_template("person.html", contact=person)


@app.route("/delete")
def delete():
    phone = request.args.get("phone")
    contact = Contact.query.filter_by(phone=phone).first()
    delete_from_db(contact)
    return redirect(url_for("home"))
