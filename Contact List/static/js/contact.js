/*This module contains script for storing and retreiving from the database*/

import { UI } from "./ui.js";

class Contact {
  /*Constructs a contact object*/
  constructor(name, phone, email) {
    this.name = name;
    this.phone = phone;
    this.email = email;
  }
}

class Store {
  static sortContacts(contacts) {
    /*Sorts contacts alphabetically*/
    const sortedContacts = contacts.sort((a, b) =>
      a.name < b.name ? -1 : a.name > b.name ? 1 : 0
    );
    return sortedContacts;
  }

  static getContacts() {
    /*Gets contact and diplays them in the UI*/
    fetch("/contacts")
      .then((res) => res.json())
      .then((data) => {
        if (data.contacts) {
          const contacts = Store.sortContacts(data.contacts);
          UI.showContacts(contacts);
        } else {
          document.querySelector("#no-contact").innerHTML = data.message;
          setTimeout(
            () =>
              (document.querySelector("#no-contact").style.display = "none"),
            5000
          );
        }
      });
  }

  static getNewContact(e) {
    e.preventDefault();

    // Get hold of input value
    const name = document.querySelector("#name").value;
    const phone = document.querySelector("#phone").value;
    const email = document.querySelector("#email").value;

    const contact = new Contact(name, phone, email);

    UI.clearContactField();
    //Store contact to database
    Store.addContact(contact);
  }

  static addContact(contact) {
    /*Add to database*/
    const requestDetails = {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/json",
      },
      body: JSON.stringify(contact),
    };
    fetch("/add", requestDetails);
    // location.assign("http://127.0.0.1:5000/");
  }

  static editContact(e, editForm, contactDetails) {
    e.preventDefault();

    const person_id = document
      .querySelector("#contact-name")
      .getAttribute("data-contact-id");

    // Get hold of input value
    const name = document.querySelector("#name").value;
    const phone = document.querySelector("#phone").value;
    const email = document.querySelector("#email").value;
    const csrfToken =
      document.querySelector("#csrf_token").value; /*Work on modifying this*/

    const contact = new Contact(name, phone, email);

    const requestDetails = {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/json",
        "X-CSRF-TOKEN": csrfToken,
      },
      body: JSON.stringify(contact),
    };
    fetch(`/person/${person_id}`, requestDetails)
      .then((res) => res.json())
      .then((data) => {
        const contact = data["contact"];
        document.querySelector("#contact-name").textContent = contact.name;
        document.querySelector("#phone-display").textContent = contact.phone;
        if (data.phone === "") {
          document.querySelector("#email-display").textContent = "Add email";
        } else {
          document.querySelector("#email-display").textContent = contact.email;
        }
      })
      .catch((error) => console.log(error.message));

    UI.clearContactField;
    editForm.style.display = "none";
    contactDetails.style.display = "block";
  }

  static cancelEdit(e, editForm, contactDetails) {
    e.preventDefault();
    editForm.style.display = "none";
    contactDetails.style.display = "block";
  }
}

/*Export so other js files can import*/
export { Store, Contact };
