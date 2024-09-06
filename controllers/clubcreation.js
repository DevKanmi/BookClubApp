const Club = require('../models/clubSchema')
const User  = require('../models/signUpSchema')

const createClub = async(request,response) =>{
    const{name,description} = request.body
    const userid = request.user.id
    const user = await User.findById(userid)

    if(!user) return response.status(404).json({error:"Only Users signed in can create Clubs/Auth Failed."})
        try{
    const club = new Club({
        name,
        description,
        creator: userid,
        members: [userid] //First Member of the Club(Creator)
    })

    const newClub = await club.save()
    user.clubs = user.clubs.concat(club._id)
    await user.save()


    response.status(201).json({message: "Club Created!",newClub})
}
        catch(error){
            response.status(404).json({error:"There was an issue Creating a club."})
        }
}

const getAllClubs = async(request,response) =>{
    const club = await Club.find({}).populate('creator',{username: 1}).populate('members',{username: 1})
    if(!club) response.status(400).json({error:"No Clubs were found!"})
    response.status(200).json(club)
}

const joinClub = async(request, response) =>{ //ANY-USER
    const requesterId = request.user.id
    const clubid = request.params.id
try{
    const club = await Club.findById(clubid)
    if(!club) return response.status(400).json({error: "Club does not exist!"})
    if(club.members.includes(requesterId)) return response.status(404).json({error: "You are a Member!"})

    
    //Check if a request already exist    
    const existingRequest =club.joinRequests.find(request => request.user.toString() === requesterId)
    if(existingRequest) return response.status(400).json({error:"Can't Send a Request, Previous one still Pending!"})
    
    club.joinRequests = club.joinRequests.concat({
        user: requesterId,
        status: 'pending'
    })
    await club.save()

    response.status(202).json({message: "Request Created"})
}
    catch(error){
        response.status(500).json({error:"Something went wrong"})
    }
}

const getPendingRequests = async (request, response) => {  //ADMIN
    const clubId = request.params.id
    const adminId = request.user.id

    try {
        const club = await Club.findById(clubId).populate('joinRequests.user')
        if (!club) return response.status(404).json({ error: "Club not found" })
        if(adminId !== club.creator.toString()){
            return response.status(401).json({error: "Only Admins are allowed to View Requests"})
        }

        const pendingRequests = club.joinRequests.filter(request => request.status === 'pending')
        response.status(200).json(pendingRequests.map(request => request.user))
    } catch (error) {
        response.status(500).json({ error: "Something went wrong" })
    }
}

const requestAccept = async(request,response) =>{  //ADMIN
    const {userid , action} = request.body
    const adminId = request.user.id
    const clubId = request.params.id

    const user = await User.findById(userid)

    try{
        const club = await Club.findById(clubId)
        if (!club) return response.status(404).json({ error: "Club not found!" })
        if(adminId != club.creator.toString()) return response.status(401).json({error: "Not Authorized to Approve requests!"})
        
        const request = club.joinRequests.find(req => req.user.toString() === userid)
        if (!request) return response.status(404).json({ error: "Request not found!" })

        if(action === 1){  //Approves
            club.members = club.members.concat(userid)
            club.joinRequests = club.joinRequests.filter(req => req.user.toString() != userid)
        }
        
        if(action === 0){  //Delete
            club.joinRequests = club.joinRequests.filter(req => req.user.toString() != userid)
        }
        await club.save()
        user.clubs = user.clubs.concat(club._id)
        await user.save()
        response.status(200).json({message: action === 1 ?  `${userid} has been added to the club.` : `${userid}'s application has been rejected.`})
    }
    catch(error){
        response.status(500).json({error: "Something went wrong"})
    }
}

module.exports ={
    createClub,
    getAllClubs,
    joinClub,
    getPendingRequests,
    requestAccept
}