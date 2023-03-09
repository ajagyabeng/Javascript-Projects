import { Store, Contact } from "../js/contact.js";

const editForm = document.querySelector("#edit-form");
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
  e.preventDefault();

  const person_id = document
    .querySelector("#contact-name")
    .getAttribute("data-contact-id");

  // Get hold of input value
  const name = document.querySelector("#name").value;
  const phone = document.querySelector("#phone").value;
  const email = document.querySelector("#email").value;

  const contact = new Contact(name, phone, email);
  console.log(typeof phone);

  const requestDetails = {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json",
    },
    body: JSON.stringify(contact),
  };
  fetch(`/person/${person_id}`, requestDetails)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error.message));

  // editForm.style.display = "none";
  // contactDetails.style.display = "block";
});

// const person = JSON.parse("{{ contact|tojson }}");
// console.log(person);
