import { UI } from "../js/ui.js";
import { Store, Contact } from "../js/contact.js";

/*Event Listener: Add Contact to Database*/
document
  .querySelector("#contact-form")
  .addEventListener("submit", Store.getNewContact(e));
