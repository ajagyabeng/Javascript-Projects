from flask import Flask, render_template, request, redirect, url_for
from models import setup_db, create_tables, Contact, add_to_db, delete_from_db, edit_in_db
from create_app import create_app
from forms import ContactForm
from dotenv import find_dotenv, load_dotenv
import os
import json

# Find environment variables
dotenv_path = find_dotenv()
load_dotenv(dotenv_path)
secret_key = os.getenv("APP_SECRET_KEY")

# Create flask app
app = create_app(secret_key)

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


def format_contact(person):
    """Formats a contact from the database. Returns an object"""
    contact = {"name": person.name,
               "phone": person.phone,
               "email": person.email,
               "id": person.id}
    return json.loads(json.dumps(contact))


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
    """"""
    form = ContactForm()
    if request.method == "POST" and form.validate_on_submit():
        data = request.form.to_dict()
        try:
            add_to_db(data)
            phone = data["phone"]
            person = Contact.query.filter_by(phone=phone).first()
            return redirect(url_for("view_contact", id=person.id))
        except:
            return {"message": "Unable to add to database"}
    return render_template("add_contact.html", form=form)


@app.route("/person/<int:id>", methods=["GET", "POST"])
def view_contact(id):
    """"""
    # phone = request.args.get("phone")
    person = Contact.query.get(id)
    edit_form = ContactForm(
        name=person.name,
        phone=person.phone,
        email=person.email
    )
    if request.method == "POST" and edit_form.validate_on_submit():
        data = request.form.to_dict()
        edit_in_db(data, person)
        return {"contact": format_contact(person)}
    else:
        print(edit_form.errors)
    return render_template("person.html", contact=format_contact(person), form=edit_form)


@app.route("/edit/<int:phone>", methods=["GET", "POST"])
def edit_contact(phone):
    person = Contact.query.filter_by(phone=phone).first()
    edit_form = ContactForm(
        name=person.name,
        phone=person.phone,
        email=person.email
    )
    if request.method == "POST" and edit_form.validate_on_submit():
        data = request.form.to_dict()
        edit_in_db(data, person)
        return redirect(url_for("view_contact", phone=phone))
    return render_template("person.html", form=edit_form, is_edit=True, contact=person)


@app.route("/delete")
def delete():
    """"""
    phone = request.args.get("phone")
    contact = Contact.query.filter_by(phone=phone).first()
    delete_from_db(contact)
    return redirect(url_for("home"))
