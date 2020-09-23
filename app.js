window.addEventListener("load", () => {
  // Global variables
  const titleInput = document.querySelector("#title");
  const authorInput = document.querySelector("#author");
  const yearInput = document.querySelector("#year");
  const bookList = document.querySelector("#booklist");

  // Book Class Constructor
  class Book {
    constructor(title, author, year) {
      this.title = title;
      this.author = author;
      this.year = year;
    }
  }

  // User Interface Class
  class UI {
    // Static method for displaying books
    static displayBooks() {
      const StoredBooks = Store.getBooks(); // Calling Get books method to get the books from localstorage
      const books = StoredBooks;
      books.forEach((book) => UI.createBookItem(book)); // Loop through the books array (from localstorage) and call createBookItem method on each array item
    }

    // Static method for creating the book item and append it to the DOM
    static createBookItem(book) {
      const bookListItem = document.createElement("li"); // Create li element
      bookListItem.classList.add("book-list-item", "list-group-item", "d-flex", "justify-content-between", "align-items-center"); // Add class names to the li element
      bookListItem.setAttribute("title", book.title); // set attribute to the li element, needed for the delete button

      bookListItem.innerHTML = `
    ${book.title} was written by ${book.author} in the year ${book.year} <button class="deleteitem btn btn-danger" onclick="UI.deleteItem(this)">Delete</button>
    `; // Creating the innerHTML of the li element with the data for the new Book constructor instance
      bookList.appendChild(bookListItem); // Append li element to the DOM ul element
    }

    // Static method for the delete button - called from the delete button inline "onclick" function
    static deleteItem(el) {
      el.parentElement.remove(); // Remove book item where click event occured
      Store.remove(el.parentElement.getAttribute("title")); // Call remove method to remove the book item from the local storage
    }

    // Static method to show alert if all input fields are not filled
    static showAlert() {
      const notification = document.createElement("div");
      notification.innerHTML = `<p class="bg-danger text-white text-center rounded p-2">All fields required</p>`;
      const container = document.querySelector(".container");
      const form = document.querySelector(".form-group");
      container.insertBefore(notification, form);
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }

    // Static method to clear all input fields
    static clearInputFields() {
      titleInput.value = "";
      authorInput.value = "";
      yearInput.value = "";
    }
  }

  // Store class for getting and updating local Storage
  class Store {
    // Static method to get books from local storage
    static getBooks() {
      let books;
      if (localStorage.getItem("books") === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem("books"));
      }

      return books;
    }

    // Static method to add book to local storage
    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem("books", JSON.stringify(books));
    }

    // Static method to remove books from local storage
    static remove(bookTitle) {
      const books = Store.getBooks();

      books.forEach((book, index) => {
        if (book.title === bookTitle) {
          books.splice(index, 1);
        }
      });
      localStorage.setItem("books", JSON.stringify(books));
    }
  }

  // Click even for the submit button
  document.querySelector("#submit").addEventListener("click", (e) => {
    e.preventDefault();

    // Check all input fields are filled
    if (titleInput.value === "" || authorInput.value === "" || yearInput.value === "") {
      UI.showAlert();
    } else {
      const newBook = new Book(titleInput.value, authorInput.value, yearInput.value); // Instance for book class

      UI.createBookItem(newBook); // Call createBookItem method with "newBook" instance passed in
      Store.addBook(newBook); // Call createBookItem method with "newBook" instance passed in
      UI.clearInputFields();
    }
  });

  // Event to call displayBooks method when content is loaded
  document.addEventListener("DOMContentLoaded", UI.displayBooks);
});
