// Book Class: Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class: Handle UI Tasks(book display, removed, alerts)
class UI {
  /*use static keyword so there wont be a need to instantiate a class*/
  static displayBooks() {
    const StoredBooks = [
      {
        title: "Book One",
        author: "James Doe",
        isbn: "343424",
      },
      {
        title: "Book Two",
        author: "Janet Bird",
        isbn: "485328",
      },
    ];

    const books = StoredBooks;

    books.forEach((book) => UI.addBookToList(book)); //loop through books to add to the list of books to be displayed.
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    // create a table row element to add to table body in html
    const row = document.createElement("tr");

    // add html columns to row
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static deleteBook(targetElement) {
    /*deletes book from UI*/
    if (targetElement.classList.contains("delete")) {
      // Get hold of element to be removed
      targetElement.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    // create div to display alert message
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    // Grab parent element of where alert should be displayed
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    // Disappear alert after 3 secs
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearFields() {
    /*Clears input field after submitting*/
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

// Store Class: Handle Storage(Local Storage)

// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add Books(receive data from form and add it)
//add eventlistener on form
document.querySelector("#book-form").addEventListener("submit", (e) => {
  // Prevent atual submit
  e.preventDefault();
  // Get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  //validate input
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fil in all fields", "danger");
  } else {
    // Instantiate a book object
    const book = new Book(title, author, isbn);

    // Add book to UI
    UI.addBookToList(book);

    // Show success message
    UI.showAlert("Book Added", "success");

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove Books
// event propagation: target the actual list and then check if an item in the list contains delete in its class then delete its parent parent of what was clicked. targetig the delete class itself would have deleted just the first item with a delete class
document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);

  // Show delete success message
  UI.showAlert("Book Removed", "info");
});
