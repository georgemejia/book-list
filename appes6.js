class Book {
  constructor(title, author, isbn) {
    this.title = title
    this.author = author
    this.isbn = isbn
  }
}

class UI {
  addBookToList(book) {
    const list = document.querySelector('#book-list')
    // Create tr element
    const row = document.createElement('tr')
    // Insert columns
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `
    list.appendChild(row)
  }

  showAlert(message, className) {
    // Create element
    const alertBox = document.createElement('div')
    // Add class name
    alertBox.className = `alert ${className}`
    // Add text
    alertBox.appendChild(document.createTextNode(message))
    // Get parent container
    const container = document.querySelector('.container')
    const form = document.querySelector('#book-form')
    // Insert alert
    container.insertBefore(alertBox, form)
    // Set timeout
    setTimeout(function () {
      document.querySelector('.alert').remove()
    }, 3000)
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove()
    }
  }

  clearFields() {
    document.querySelector('#title-input').value = ''
    document.querySelector('#author-input').value = ''
    document.querySelector('#isbn-input').value = ''
  }
}

// Local Storage Class
class Store {
  // Get Books
  static getBooks() {
    let books;

    if (localStorage.getItem('books') === null) {
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }

    return books
  }

  // Display Books From Local Storage
  static displayBooks() {
    const books = Store.getBooks()
    books.forEach((book) => {
      const ui = new UI
      ui.addBookToList(book)
    })
  }

  // Add Book To Local Storage
  static addBook(book) {
    const books = Store.getBooks()
    books.push(book)
    localStorage.setItem('books', JSON.stringify(books))
  }

  // Remove Book From Local Storage
  static removeBook(isbn) {
    const books = Store.getBooks()

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1)
      }
    })

    localStorage.setItem('books', JSON.stringify(books))
  }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks())

// Event listeners
const form = document.querySelector('#book-form')
form.addEventListener('submit', function (e) {
  // Gets form input values
  const title = document.querySelector('#title-input').value
  const author = document.querySelector('#author-input').value
  const isbn = document.querySelector('#isbn-input').value

  // Instanciating a book
  const book = new Book(title, author, isbn)

  // Instanciate UI
  const ui = new UI()

  if (title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all the fields', 'error')
  } else {
    // UI add book to list
    ui.addBookToList(book)
    // Add To Local Storage
    Store.addBook(book)
    // Show alert
    ui.showAlert('Book added!', 'success')
    // Clear fields
    ui.clearFields()
  }

  e.preventDefault()
})

// Delete event listener
const bookList = document.querySelector('#book-list')
bookList.addEventListener('click', function (e) {
  // Instanciate UI constructor
  const ui = new UI()
  // Delete Book
  ui.deleteBook(e.target)
  // Remove From Local Storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
  // Show Alert
  ui.showAlert('Book removed!', 'success')

  e.preventDefault()
})