const mongoose = require('mongoose');
const quotesSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'User',
    },
    name:{
        type:String,
        require:[true,'Please add the name of the author.'],
    },
    text:{
        type:String,
        require:[true,'Please add a quote..']
    }
}, {
    timestamps:true,
})
module.exports = mongoose.model('Quote',quotesSchema);