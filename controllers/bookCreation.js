const User = require('../models/signUpSchema')
const Book = require('../models/bookSchema')

const createBook = async(request, response) =>{
    try{
        const userid = request.user.id
        console.log(userid)
    const user = await User.findById(userid)

    if(!user){
        response.status(404).json({error:'User not found'})
    }
    const {title,author,genre,summary,highlights} = request.body

    const book = new Book({
        title,
        author,
        genre,
        summary,
        highlights,
        user : user._id
    })

    const savedBook = await book.save()
    user.books = user.books.concat(savedBook._id)
    await user.save()

    response.status(201).json({
        message: 'Book saved',
        savedBook
    }) }
    catch(error){
        console.error('error is', error)
        response.status(404).json({error: 'Book Could not be Created'})
    }
}



const getBook = async(request, response) =>{
    const book = await Book.find({}).populate('user')
    response.status(200).json(book)
}

module.exports ={
    createBook,
    getBook
}