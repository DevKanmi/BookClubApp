const User = require('../models/signUpSchema')
const Book = require('../models/bookSchema')
const { request, response } = require('../app')

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
    if(!request.user){
        return response.status(404).json({error: "You are not Allowed to Access this"})
    }
    const book = await Book.find({user:request.user.id}).populate('user',{username: 1})
    response.status(200).json(book)
}

const updateBook = async (request, response) => {
    const userId = request.user.id;

    const user = await User.findById(userId);
    if (!user) {
        return response.status(404).json({ error: 'User not found' });
    }
    
    //Fetches whatever field i pass in the request body
    const updates = request.body;

    const book = await Book.findOneAndUpdate(
        { _id: request.params.id, user: userId },
        { $set: updates }, //Only Changes what I passed and leaves the rest of field Unchanged.
        { new: true }
    );

    if (!book) {
        return response.status(404).json({ error: 'Book not found or not authorized' });
    }

    response.status(201).json(book);
};


const updateBookHighlights = async(request,response) => {
    const userId = request.user.id
    const bookId = request.params.id
    const {highlights} = request.body

    try{
        const book = await Book.findById({_id: bookId, user: userId})
        book.highlights = book.highlights.concat(highlights)
        const updated =  await book.save()
        response.status(201).json(updated)
        }
    catch(error){
        console.log(error)
        response.status(500).json({error: "Something went wrong."})
    }

}

const deleteBook = async(request, response) =>{
    try{
    const userid = request.user.id
    const user = await User.findById(userid)
    if(!user){
        return response.status(404).json({error:"User does not exist"})
     }
    const book = await Book.findByIdAndDelete({_id: request.params.id, user: userid})
    if(!book){
        return response.status(404).json({error: "Bookd does not exist/You are not allowed to delete"})
    }

    await User.updateMany(
        {books: request.params.id},
        {$pull : {books: request.params.id}} ) //Removes BookId from user array after deletion.
    response.status(204).end()
}
    catch(error){
        return response.status(404).json({error:"Book Could not be deleted"})
    }
}

const findOneBook = async(request,response) =>{
    const userid = request.user.id
    const user = await User.findById(userid)
    if(!user){
        return response.status(204).json({error: "user does not exist"})
    }
    const book = await Book.findById({_id: request.params.id, user: userid})
    if(!book){
        return response.status(404).json({error: "Book not found"})
    }

    response.status(200).json(book)
}

module.exports ={
    createBook,
    getBook,
    updateBook,
    deleteBook,
    findOneBook,
    updateBookHighlights
}