const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../../models/user-model');
const genToken = require('../../jwt-token/jwt-token');

const registerHanlder = asyncHandler(async(req,res) => {
    const { name, email, password } = req.body;

    if(!name || ! password || !email) {
        throw new Error('Please add all the fields');
    }
    else {
        const user = await User.findOne( { email } );
        if(user) {
            throw new Error('User already exist');
        }
        else {
            const salt = await bcrypt.genSalt(8);
            const hashedPassword = await bcrypt.hash(password,salt);
            const userCreated = await User.create({name,email,password:hashedPassword});
            res.json({_id:userCreated._id,name:userCreated.name,email:userCreated.email,token:genToken(userCreated._id)});
        }
    }
})
const loginHandler = asyncHandler(async(req,res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(user && await bcrypt.compare(password,user.password)) {
        res.json({_id:user._id,name:user.name,email:user.email, token:genToken(user._id)});
    }
    else {
        throw new Error('Please add valid credentials');
    }
})
module.exports = {
    registerHanlder,
    loginHandler
}