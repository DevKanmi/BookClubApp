//Import needed Models
const User = require("../models/signUpSchema");
const Book = require("../models/bookSchema");
const Thread = require("../models/threadSchema");
const Reply = require("../models/replySchema");
const mongoose = require('mongoose')

const createThread = async (request, response) => {
  const { bookId, title, content } = request.body;
  const userid = request.user.id;
  try {
    const thread = new Thread({
      book: bookId, //we can use populate to fetch name of the book , instead of Creating from scratch.
      title,
      content,
      user: userid,
    });

    const newThread = await thread.save();
    response.status(201).json({ message: "New Thread Created!", newThread });
  } catch (error) {
    response.status(404).json({ error: "Thread Could not be Created" });
  }
};

const replyToThread = async (request, response) => {
  try {
    const { content } = request.body;
    const userid = request.user.id;
    const thread = await Thread.findById(request.params.id)  //Find Thread you want to reply to
    if(!thread){ return response.status(404).json({error:"Thread could not be found"})}

      const reply = new Reply({
      content,
      user: userid,
      thread: thread._id
    });

    const newReply = await reply.save();
    
    //add reply to correct thread
    thread.replies = thread.replies.concat(newReply._id)
    await thread.save()

    response.status(201).json({ message: "Response sent!", newReply })

  } catch (error) {response.status(404).json({error:"Reply Could not be sent"})
console.error(error);
}
};


const getThreadForBook = async(request,response) =>{
   try{ 
    const BookId = request.params.BookId

    const thread = await Thread.find({book:BookId}).populate('book',{title: 1}).populate('user',{username :1}).populate('replies',{content: 1,user:1})
    if(!thread){
        response.status(404).json({error:"Thread does not exist for book"})
    }
    response.status(200).json(thread)
}
   catch(error){
    console.error(error);
    
    response.status(500).json({error: "Server Error"})
   }
}

const deleteAThread = async(request,response) =>{
  const userId = request.user.id
  const threadId = request.params.id
  try{
  const thread = await Thread.findOneAndDelete({ _id:threadId ,user:userId})
  if(!thread){
    return response.status(404).json({error: "Thread Could not be Found or Not Authorized!"})
  }
  response.status(204).json({message: "Thread Has been deleted!"}).end()
  }
  catch(error){
    response.status(404).json({error:"Something Went Wrong"})
  }
}

const getAllThreads = async(request,response) =>{
  try{
    const threads = await Thread.find({}).populate('book',{title: 1})
    if(!threads) return response.status(404).json({error:"No threads found"})
    response.status(200).json(threads)
  }
  catch(error){
    response.status(404).json({error:"No Threads Displayed!/Something is Wrong."})
  }
}
module.exports = {
    createThread,
    replyToThread,
    getThreadForBook,
    deleteAThread,
    getAllThreads
}