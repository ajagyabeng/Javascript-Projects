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

      /*SORT CONTACTS BASED ON NAMES*/
      contacts.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        /*In ASCENDING order: change the operators to SORT in DESCENDING order*/
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
        // Locate which header to place contact under
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

/*--------------------EVENTS---------------------*/
// Event Litener: Display Contacts
document.addEventListener("DOMContentLoaded", UI.displayContacts);

// Event Listener: Add Contact to Local Storage and UI
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

// Eventlistener: Filter Names
filterInput.addEventListener("keyup", filterNames);

/*
1. Add name to the approriate sorted position as soon as it is added
2. Add phone numbers
3. Create add contact page (inputs for first & last name, work no., mobile no., email.)
4. 
*/
