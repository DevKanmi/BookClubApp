const jwt = require('jsonwebtoken')

const getTokenFrom = (request) =>{
    const authorization = request.get('Authorization')
    if(authorization && authorization.startsWith('Bearer ')){
      return authorization.replace('Bearer ','')
    }
    else{return null}
}

const tokenAuthentication =(req,res,next) =>{
    const token = getTokenFrom(req) //This Returns the token in the Header

    if(!token){
        res.status(401).json({error: 'There is no token found'})
    }

    try{
        const decodedToken = jwt.verify(token,process.env.SECRET)
        if(!decodedToken.id){  //This is to Check if there is any id attached to that token retrieved, or if the token has expired
             res.status(401).json({error: 'Token is inValid'})
        }
        req.user = decodedToken  //Assigned the DecodedToken to req.user variable , what it means is below
        next() }

        catch(error){
            res.status(401).json({error:'Token authentication failed'})
        }
}

//if we do req.user.id => it looks up the token, check if there is a user id attached to it and returns the id
//now we can now use that id to search the database, return specific things from what was stored in he decodedToken 

module.exports ={ tokenAuthentication }