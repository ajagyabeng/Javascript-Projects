// Get input element
const filterInput = document.querySelector("#filter-input");

// Add eventlistener
filterInput.addEventListener("keyup", filterNames);

function filterNames() {
  // Get value of input
  const filterValue = filterInput.value.toUpperCase();

  // Get names ul
  const ul = document.querySelector("#names");

  // Get lis from ul
  const lis = ul.querySelectorAll(".collection-item");

  //Loop through collection-item lis
  lis.forEach((li) => {
    let a = li.getElementsByTagName("a")[0];

    // Check if it matches
    if (a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      // checks if filterValue is in list of names
      li.style.display = "";
    } else {
      li.style.display = "none";
    }
  });
}

/*--------------------CLASSES-----------------------------*/
// ARRAY TO BE USED TO CREATE CONTACT HEADERS
const contactHeaders = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

class Contact {
  constructor(name) {
    this.name = name;
  }
}

class Store {
  static getContacts() {
    let contacts;

    if (localStorage.getItem("contacts") === null) {
      contacts = [];
    } else {
      contacts = JSON.parse(localStorage.getItem("contacts"));
    }
    return contacts;
  }

  static addContact(contact) {
    const contacts = Store.getContacts();

    contacts.push(contact);

    localStorage.setItem("contacts", JSON.stringify(contacts));
  }
}

class UI {
  static displayContacts() {
    const ul = document.querySelector("#names");
    contactHeaders.forEach((header) => {
      const li = document.createElement("li");
      li.classList.add("collection-header");
      li.innerHTML = `<h5>${header}</h5>`;
      ul.appendChild(li);
    });

    const contacts = Store.getContacts();

    contacts.forEach((contact) => UI.addContactToList(contact));
  }

  static addContactToList(contact) {
    // Get all the contact headers in a list
    const headers = document.querySelectorAll(".collection-header");

    //Loop through headers to compare to first letter of contact names
    headers.forEach((header) => {
      console.log(contact.name);
      if (
        contact.name[0].toUpperCase() === header.firstElementChild.textContent
      ) {
        const li = document.createElement("li");
        li.classList.add("collection-item");
        li.innerHTML = `<a href='#'>${contact.name}</a>`;
        const ul = document.querySelector("#names");
        header.after(li);
      }
    });
  }

  static clearContactField() {
    document.querySelector("#name").value = "";
  }
}

/*--------------------EVENT LISTENERS---------------------*/
//WHEN DOM LOADS
document.addEventListener("DOMContentLoaded", UI.displayContacts);

// add eventListener of form
document.querySelector("#contact-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Get hold of input value
  const name = document.querySelector("#name").value;

  // validate input
  if (name === "") {
    alert("Please fill all fields"); // change this later
  } else {
    const contact = new Contact(name);
    Store.addContact(contact);
    UI.clearContactField();
  }
});
