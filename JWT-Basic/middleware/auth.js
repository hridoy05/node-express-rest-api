const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');
const CustomAPIError = require('../errors/custom-error')


const authenticationMiddleWare = async (req,res,next) => {
    const authorHeader = req.headers.authorization

    if(!authorHeader || !authorHeader.startsWith('Bearer ')){
    throw new UnauthenticatedError("no token")
    }
    const token = authorHeader.split(" ")[1]
    try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET)
       const {id, username} = decoded 
       req.user = {id, username}
       next()
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route')
    }
}
module.exports = authenticationMiddleWare