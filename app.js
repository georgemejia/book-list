// Book constructor
function Book(title, author, isbn) {
  this.title = title
  this.author = author
  this.isbn = isbn
}

// UI constructor
function UI() {}

// UI add book to list prototype
UI.prototype.addBookToList = function(book) {
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

// Show error alert prototype
UI.prototype.showAlert = function(message, className) {
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
  setTimeout(function() {
    document.querySelector('.alert').remove()
  }, 3000)
}

// Delete book prototype
UI.prototype.deleteBook = function(target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove()
  }
}

// Clear fields prototype
UI.prototype.clearFields = function() {
  document.querySelector('#title-input').value = ''
  document.querySelector('#author-input').value = ''
  document.querySelector('#isbn-input').value = ''
}

// Event listeners
const form = document.querySelector('#book-form')
form.addEventListener('submit', function(e) {
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
    // Show alert
    ui.showAlert('Book added!', 'success')
    // Clear fields
    ui.clearFields()
  }

  e.preventDefault()
})

// Delete event listener
const bookList = document.querySelector('#book-list')
bookList.addEventListener('click', function(e) {
  // Instanciate UI constructor
  const ui = new UI()
  // Delete Book
  ui.deleteBook(e.target)
  // Show Alert
  ui.showAlert('Book removed!', 'success')

  e.preventDefault()
})