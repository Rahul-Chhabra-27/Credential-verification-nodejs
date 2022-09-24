const mongoose = require('mongoose');

const user = mongoose.Schema({
    name : {
        type:String,
        require:[true,'Please add your name'],
    },
    email : {
        type:String,
        require:[true,'Please add your email'],
        unique:true,
    },
    password : {
        type:String,
        require:[true,'Please add your password'],
    }
}, {
    timestamps : true
})

module.exports = mongoose.model('User',user);