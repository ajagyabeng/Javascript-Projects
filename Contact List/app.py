from flask import Flask, render_template, request
from models import setup_db, create_tables, Contact, add_to_db
from dotenv import find_dotenv, load_dotenv

app = Flask(__name__)
setup_db(app)

create_tables(app)


@app.route("/")
def home():
    return render_template("index.html")


def format_contacts(contacts):
    contact_list = []
    for contact in contacts:
        contact_list.append({
            "name": contact.name,
            "phone": contact.phone,
        })
    return contact_list


@app.route("/contacts")
def get_contacts():
    # time.sleep(1)  # not ideal
    contacts = Contact.query.all()
    if contacts:
        return {"contacts": format_contacts(contacts)}
    return {"message": "No contacts saved."}


@app.route("/add", methods=["GET", "POST"])
def add_contact():
    if request.method == "POST":
        data = request.get_json()
        try:
            add_to_db(data)
            contacts = Contact.query.order_by(Contact.name.desc()).all()
            return {"contacts": format_contacts(contacts)}
        except:
            return {"message": "Unable to add to database"}
    return render_template("new.html")
