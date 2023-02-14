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
    const StoredBBooks = [
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
  }
}

// Store Class: Handle Storage(Local Storage)

// Event: Display Books

// Event: Add Books

// Event: Remove Books
