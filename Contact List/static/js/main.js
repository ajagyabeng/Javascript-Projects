// Import from other JS files
import { Store, Contact } from "./contact.js";
import { UI } from "./ui.js";
import { Filter } from "./filter.js";

/*--------------------EVENTS---------------------*/
// Event Listener: Display Headers
document.addEventListener("DOMContentLoaded", Store.getContacts);

// Event Listener: Show Contact form
document
  .querySelector("#new-contact")
  .addEventListener("click", Contact.newContactPage);

// Event Listener: Filter Names
document
  .querySelector("#filter-input")
  .addEventListener("keyup", Filter.filterNames);

/*
TODOS
1. When adding new contact, check if the exact name already exists(warn to make changes to avoid confusion)
2. When adding new contact, check if the exact number already exist in contacts(show number and name which it is stored to)
3. Add pop up when name is clicked(displays Name, Phone, Email )
4. Connect to server
4i. Add labels(Friends, family, work, school, etc.)
5. More actions(Hide, delete)
6. Add contact(add country calling code to form) - countryinfo module in python
*/
