import { Store, Contact } from "../js/contact.js";
import { UI } from "../js/ui.js";

const editForm = document.querySelector("#edit-form-container");
const contactDetails = document.querySelector("#contact-details");
editForm.style.display = "none";

// show edit form
document.querySelector("#edit-btn").addEventListener("click", (e) => {
  e.preventDefault();
  contactDetails.style.display = "none";
  editForm.style.display = "block";
});

// show contact details
document.querySelector("#save-btn").addEventListener("click", (e) => {
  Store.editContact(e, editForm, contactDetails);
});

// Cancel edit
document.querySelector("#cancel-edit").addEventListener("click", (e) => {
  Store.cancelEdit(e, editForm, contactDetails);
});
