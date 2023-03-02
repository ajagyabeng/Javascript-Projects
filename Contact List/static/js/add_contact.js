import { UI } from "../js/ui.js";
import { Store, Contact } from "../js/contact.js";

// Event Listener: Add Contact to Database
document.querySelector("#contact-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Get hold of input value
  const name = document.querySelector("#name").value;
  const phone = document.querySelector("#phone").value;
  const email = document.querySelector("#email").value;

  // validate input
  if (name === "" || phone === "") {
    alert("Please fill all fields"); // change this later
  } else {
    const contact = new Contact(name, phone, email);

    //Store contact to database
    Store.addContact(contact);
    UI.clearContactField();
  }
});
