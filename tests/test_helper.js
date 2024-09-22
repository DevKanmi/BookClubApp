const Book = require('../models/bookSchema')
const User = require('../models/signUpSchema')
const initialBooks = [
  {
    title: '',
    author:'',
    genre:'',
    summary: '',
    Highlight : [
        ''
    ]
  },
  {
    title: '',
    author:'',
    genre:'',
    summary: '',
    Highlight : [
        ''
    ]
  }
]

const nonExistingId = async () => {
  const book = new Book({ content: 'willremovethissoon' })
  await book.save()
  await book.deleteOne()

  return book._id.toString()
}

const booksInDb = async () => {
  const books = await Book.find({})
  return books.map(book => book.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBooks, nonExistingId, booksInDb , usersInDb
}