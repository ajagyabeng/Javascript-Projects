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
  constructor(name, phone, email) {
    this.name = name;
    this.phone = phone;
    this.email = email;
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
  static displayHeaders() {
    // Adds header Alphabet (A, B, C, etc.)
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
  }

  static addContactToList() {
    const contacts = Store.getContacts();
    // Get all the contact headers in a list
    const headers = document.querySelectorAll(".collection-header");

    contacts.forEach((contact) => {
      // create li element for each contact
      const li = document.createElement("li");
      li.classList.add("collection-item");
      li.innerHTML = `<a href='#'>${contact.name}</a>`;

      //Loop through headers to compare to first letter of contact names
      headers.forEach((header) => {
        if (
          contact.name[0].toUpperCase() === header.firstElementChild.textContent
          // Locate which header to place contact under
        ) {
          li.classList.add(`${header.firstElementChild.textContent}-contacts`);
          header.after(li);
        }
      });
    });
  }

  static resetHeaders() {
    // Allows new header to be added if new contact name added starts with a new alphabet.
    const displayedHeaders = document.querySelectorAll(".collection-header");
    displayedHeaders.forEach((header) => {
      header.remove();
    });
  }

  static resetContacts() {
    // Allows new contact name to be added alphabetically
    const displayedContacts = document.querySelectorAll(".collection-item");

    displayedContacts.forEach((contact) => {
      contact.remove();
    });
  }

  static clearContactField() {
    // Clear input field after adding a contact
    document.querySelector("#name").value = "";
    document.querySelector("#phone").value = "";
    document.querySelector("#email").value = "";
  }
}

/*--------------------EVENTS---------------------*/
// Event Listener: Display Headers
document.addEventListener("DOMContentLoaded", UI.displayHeaders());

// Event Listener: Display Contacts
document.addEventListener("DOMContentLoaded", UI.addContactToList());

// Event Listener: Filter Names
filterInput.addEventListener("keyup", filterNames);

// Event Listener: Add Contact to Local Storage and UI
document.querySelector("#contact-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Remove already displayed contacts.
  UI.resetContacts();

  // Reset Headers
  UI.resetHeaders();

  // Get hold of input value
  const name = document.querySelector("#name").value;
  const phone = document.querySelector("#phone").value;
  const email = document.querySelector("#email").value;

  // validate input
  if (name === "" || phone === "") {
    alert("Please fill all fields"); // change this later
  } else {
    const contact = new Contact(
      `${name[0].toUpperCase()}${name.substring(1)}`,
      phone,
      email
    ); // Capitalize the input
    Store.addContact(contact); //Store contact to localStorage
    UI.displayHeaders(); // add contact to UI
    UI.addContactToList(); // add contact to UI
    UI.clearContactField();
  }
});

/*
TODOS
2. Add phone numbers
3. Create an add contact page (inputs for first & last name, work no., mobile no., email.)
4. Connect to server
*/
