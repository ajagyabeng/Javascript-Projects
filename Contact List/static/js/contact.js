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
  }
}

/*Export so other js files can import*/
export { Store, Contact };
