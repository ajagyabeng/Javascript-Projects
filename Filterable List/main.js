// Get input element
const filterInput = document.querySelector("#filter-input");

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
      li.style.display = "";
    } else {
      li.style.display = "none";
    }
  });
}

/*--------------------CLASSES-----------------------------*/
// ARRAY TO BE USED TO CREATE CONTACT HEADERS
// const contactHeaders = [
//   "A",
//   "B",
//   "C",
//   "D",
//   "E",
//   "F",
//   "G",
//   "H",
//   "I",
//   "J",
//   "K",
//   "L",
//   "M",
//   "N",
//   "O",
//   "P",
//   "Q",
//   "R",
//   "S",
//   "T",
//   "U",
//   "V",
//   "W",
//   "X",
//   "Y",
//   "Z",
// ];

class Contact {
  constructor(name) {
    this.name = name;
  }
}

class Store {
  static getContacts() {
    // Retrieves contact from localStorage.
    let contacts;

    if (localStorage.getItem("contacts") === null) {
      contacts = [];
    } else {
      contacts = JSON.parse(localStorage.getItem("contacts"));

      /*sort array of objects based on names*/
      contacts.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        //  in ascending order
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      });

      // /*-------------Using Ternary operator-------------*/
      // let sortedContacts = contacts.sort((a, b) =>
      //   a.name < b.name ? 1 : a.name > b.name ? -1 : 0
      // );
      // return sortedContacts;
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
    // Add alphabets in contact headers Array as Header to DOM list
    const contacts = Store.getContacts();
    let contactHeaders = [];
    contacts.forEach((contact) => {
      if (!contactHeaders.includes(contact.name[0].toUpperCase())) {
        contactHeaders.push(contact.name[0].toUpperCase());
      }
    });

    const ul = document.querySelector("#names");
    contactHeaders.sort().forEach((header) => {
      const li = document.createElement("li");
      li.classList.add("collection-header");
      li.innerHTML = `<h5>${header}</h5>`;
      ul.appendChild(li);
    });

    // Pass in stored contacts to be displayed under each header
    contacts.forEach((contact) => UI.addContactToList(contact));
  }

  static addContactToList(contact) {
    // Get all the contact headers in a list
    const headers = document.querySelectorAll(".collection-header");

    const li = document.createElement("li");
    li.classList.add("collection-item");
    li.innerHTML = `<a href='#'>${contact.name}</a>`;

    //Loop through headers to compare to first letter of contact names
    headers.forEach((header) => {
      console.log(contact.name);
      if (
        contact.name[0].toUpperCase() === header.firstElementChild.textContent
      ) {
        header.after(li);
      }
    });
  }

  static clearContactField() {
    // Clear input field after adding a contact
    document.querySelector("#name").value = "";
  }
}

/*--------------------EVENT LISTENERS---------------------*/
//WHEN DOM LOADS
document.addEventListener("DOMContentLoaded", UI.displayContacts);

// add eventListener to form
document.querySelector("#contact-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Get hold of input value
  const name = document.querySelector("#name").value;

  // validate input
  if (name === "") {
    alert("Please fill all fields"); // change this later
  } else {
    const contact = new Contact(`${name[0].toUpperCase()}${name.substring(1)}`); // Capitalize the input
    UI.addContactToList(contact); // add contact to UI
    Store.addContact(contact); //Store contact to localStorage
    UI.clearContactField();
  }
});

// Add eventlistener
filterInput.addEventListener("keyup", filterNames);
