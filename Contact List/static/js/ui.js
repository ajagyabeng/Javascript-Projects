/*Handle the User interface for the app*/

class UI {
  static showContacts(contacts) {
    const ul = document.querySelector("#names");
    contacts.sort().forEach((contact) => {
      const li = document.createElement("li");
      li.classList.add("collection-item");
      li.innerHTML = `<a href="/person?phone=${contact.phone}">${contact.name}</a>`;
      ul.appendChild(li);
    });
  }

  static showNewContactForm() {
    // Hides New Contact button and displays Add contact form
    document.querySelector("#new-contact").style.display = "none";
    document.querySelector("#contact-form").style.display = "block";
  }

  static clearContactField() {
    // Clear input field after adding a contact
    document.querySelector("#name").value = "";
    document.querySelector("#phone").value = "";
    document.querySelector("#email").value = "";
  }
}

/*Export so other js files can import*/
export { UI };
