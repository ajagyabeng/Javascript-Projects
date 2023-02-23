/*--------Book Class: Represents a Book--------*/
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

/*-----UI Class: Handle UI Tasks(book display, removed, alerts)------*/
class UI {
  /*use static keyword so there wont be a need to instantiate a class before using them*/
  static displayBooks() {
    // gets the books from local storage
    const books = Store.getBooks();

    //loop through books to add to the list of books to be displayed.
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    // select table body element to add books to.
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

    // add row to table body
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

    // Grab element that created element(div) is to be inserted before
    const form = document.querySelector("#book-form");

    // insert created element(div)
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

/*-----Store Class: Handle Storage(Local Storage)-----*/
// local storage stores key value pairs as strings
class Store {
  static getBooks() {
    let books;
    // check if there is a current book item in local storage
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
      // Locale Storage data are strings. Run through JSON.parse method to use it as a regular JS array of objects.
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();

    // add the book passed in to the books in localStorage
    books.push(book);

    // reset it to local storage
    localStorage.setItem("books", JSON.stringify(books));
    // Wrap books in JSON.stringify to convert it from an array of objects to a string before storing in local storage
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    // loop through to check if isbn provided match that of a book and then "slice" it.
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    // reset localStorage
    localStorage.setItem("books", JSON.stringify(books));
    // Wrap books in JSON.stringify to convert it from an array of objects to a string before storing in local storage
  }
}

/*------------Event: Display Books--------------*/

// Once DOM loads, books available in storage will display
document.addEventListener("DOMContentLoaded", UI.displayBooks);

/*---Event: Add Books(receive data from form and add it)---*/

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

    // Add book to locale storage
    Store.addBook(book);

    // Show success message
    UI.showAlert("Book Added", "success");

    // Clear fields
    UI.clearFields();
  }
});

/*------------Event: Remove Books-----------*/
// event propagation: target the actual list and then check if an item in the list contains delete in its class then delete its parent parent of what was clicked. targetig the delete class itself would have deleted just the first item with a delete class
document.querySelector("#book-list").addEventListener("click", (e) => {
  // remove from UI
  UI.deleteBook(e.target);

  // remove from Local storage
  const isbn = e.target.parentElement.previousElementSibling.textContent; // get hold of isbn in previous sibling
  Store.removeBook(isbn);

  // Show delete success message
  UI.showAlert("Book Removed", "info");
});
