const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {

    // verify authentication
    const { authorization } = req.headers

    if (!authorization){
        return res.status(401).json({error: 'Authorization token required'})
    }

    // getting the token part of the string
    const token = authorization.split(' ')[1]

    try {
       const {_id} = jwt.verify(token, process.env.SECRET) 

       req.user = await User.findOne({_id}).select('_id') // only return the id and not the whole object
       next() //fires the next handler function
    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth