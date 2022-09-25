const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

const protect = asyncHandler(async(req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
       try {
            token = req.headers.authorization.split(' ')[1];
            const { id } = jwt.verify(token,process.env.JWT_SECRET);
            const user = await User.findById(id).select('-password');
            req.user = user
            next();
       } catch (error) {
            req.statusCode(401);
            throw new Error('Not authorized!');
       }
    }
    else {
        res.status(401);
        throw new Error('Not Authorized,No Token');
    }
})

module.exports = protect;

