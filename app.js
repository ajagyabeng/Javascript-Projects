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
}

// Store Class: Handle Storage(Local Storage)

// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add Books(receive data from form and add it)
//-----add eventlistener on form
document.querySelector("#book-form").addEventListener("submit", (e) => {
  // get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;
});

// Event: Remove Books
