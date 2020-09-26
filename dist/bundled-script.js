/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Global variables\r\nconst titleInput = document.querySelector(\"#title\");\r\nconst authorInput = document.querySelector(\"#author\");\r\nconst yearInput = document.querySelector(\"#year\");\r\nconst bookList = document.querySelector(\"#booklist\");\r\n\r\n// Book Class Constructor\r\nclass Book {\r\n  constructor(title, author, year) {\r\n    this.title = title;\r\n    this.author = author;\r\n    this.year = year;\r\n  }\r\n}\r\n\r\n// User Interface Class\r\nclass UI {\r\n  // Static method for displaying books\r\n  static displayBooks() {\r\n    const StoredBooks = Store.getBooks(); // Calling Get books method to get the books from localstorage\r\n    const books = StoredBooks;\r\n    books.forEach((book) => UI.createBookItem(book)); // Loop through the books array (from localstorage) and call createBookItem method on each array item\r\n  }\r\n\r\n  // Static method for creating the book item and append it to the DOM\r\n  static createBookItem(book) {\r\n    const bookListItem = document.createElement(\"li\"); // Create li element\r\n    bookListItem.classList.add(\"book-list-item\", \"list-group-item\", \"d-flex\", \"justify-content-between\", \"align-items-center\"); // Add class names to the li element\r\n    bookListItem.setAttribute(\"title\", book.title); // set attribute to the li element, needed for the delete button\r\n\r\n    bookListItem.innerHTML = `\r\n      ${book.title} was written by ${book.author} in the year ${book.year} <button class=\"deleteitem btn btn-danger\">Delete</button>\r\n    `; // Creating the innerHTML of the li element with the data for the new Book constructor instance\r\n    bookList.appendChild(bookListItem); // Append li element to the DOM ul element\r\n    // Click event for Delete button\r\n    document.querySelector(\".deleteitem\").addEventListener(\"click\", (e) => {\r\n      UI.deleteItem(e.target);\r\n    });\r\n  }\r\n\r\n  // Static method for the delete button - called from the delete button inline \"onclick\" function\r\n  static deleteItem(el) {\r\n    el.parentElement.remove(); // Remove book item where click event occured\r\n    Store.remove(el.parentElement.getAttribute(\"title\")); // Call remove method to remove the book item from the local storage\r\n  }\r\n\r\n  // Static method to show alert if all input fields are not filled\r\n  static showAlert() {\r\n    const notification = document.createElement(\"div\");\r\n    notification.innerHTML = `<p class=\"bg-danger text-white text-center rounded p-2\">All fields required</p>`;\r\n    const container = document.querySelector(\".container\");\r\n    const form = document.querySelector(\".form-group\");\r\n    container.insertBefore(notification, form);\r\n    setTimeout(() => {\r\n      notification.remove();\r\n    }, 3000);\r\n  }\r\n\r\n  // Static method to clear all input fields\r\n  static clearInputFields() {\r\n    titleInput.value = \"\";\r\n    authorInput.value = \"\";\r\n    yearInput.value = \"\";\r\n  }\r\n}\r\n\r\n// Store class for getting and updating local Storage\r\nclass Store {\r\n  // Static method to get books from local storage\r\n  static getBooks() {\r\n    let books;\r\n    if (localStorage.getItem(\"books\") === null) {\r\n      books = [];\r\n    } else {\r\n      books = JSON.parse(localStorage.getItem(\"books\"));\r\n    }\r\n\r\n    return books;\r\n  }\r\n\r\n  // Static method to add book to local storage\r\n  static addBook(book) {\r\n    const books = Store.getBooks();\r\n    books.push(book);\r\n    localStorage.setItem(\"books\", JSON.stringify(books));\r\n  }\r\n\r\n  // Static method to remove books from local storage\r\n  static remove(bookTitle) {\r\n    const books = Store.getBooks();\r\n\r\n    books.forEach((book, index) => {\r\n      if (book.title === bookTitle) {\r\n        books.splice(index, 1);\r\n      }\r\n    });\r\n    localStorage.setItem(\"books\", JSON.stringify(books));\r\n  }\r\n}\r\n\r\n// Click even for the submit button\r\ndocument.querySelector(\"#submit\").addEventListener(\"click\", (e) => {\r\n  e.preventDefault();\r\n\r\n  // Check all input fields are filled\r\n  if (titleInput.value === \"\" || authorInput.value === \"\" || yearInput.value === \"\") {\r\n    UI.showAlert();\r\n  } else {\r\n    const newBook = new Book(titleInput.value, authorInput.value, yearInput.value); // Instance for book class\r\n\r\n    UI.createBookItem(newBook); // Call createBookItem method with \"newBook\" instance passed in\r\n    Store.addBook(newBook); // Call createBookItem method with \"newBook\" instance passed in\r\n    UI.clearInputFields();\r\n  }\r\n});\r\n\r\n// Event to call displayBooks method when content is loaded\r\ndocument.addEventListener(\"DOMContentLoaded\", UI.displayBooks);\r\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

/******/ });