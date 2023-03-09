/*Handle the User interface for the app*/

class UI {
  static showContacts(contacts) {
    /*Adds each contact to the UI*/
    const ul = document.querySelector("#names");
    contacts.sort().forEach((contact) => {
      const li = document.createElement("li");
      li.classList.add("collection-item");
      li.innerHTML = `<a href="/person/${contact.id}">${contact.name}</a>`;
      ul.appendChild(li);
    });
  }

  static clearContactField() {
    // Clear input field after adding a contact. Functionality not needed any longer
    document.querySelector("#name").value = "";
    document.querySelector("#phone").value = "";
    document.querySelector("#email").value = "";
  }
}

/*Export so other js files can import*/
export { UI };
