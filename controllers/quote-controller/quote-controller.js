const asyncHandler = require('express-async-handler');
const Quote = require('../../models/quotes-model');

const createQuote = asyncHandler(async(req,res) => {
    const { name, text } = req.body;

    if(!name || !text ) {
        req.statusCode(401);
        throw new Error('Please add all the mandatory fields..');
    }
    else {
        const createOne = await Quote.create({
            user:req.user._id,
            name,
            text,
        })

        res.status(201).json(createOne);
    }
});

const deleteQuote = asyncHandler(async(req,res) => {
    const { id } = req.params;

    const quote = await Quote.findById(id);

    if(quote) {
        const deletedOne = await Quote.findByIdAndDelete(id);
        res.status(201).json(deletedOne);
    }
    else {
        res.status(401);
        throw new Error('No Quote Exist.');
    }
});

const updateQuote = asyncHandler(async(req,res) => {
    const { id } = req.params;
    const { name, text } = req.body;
    const quote = await Quote.findById(id);

    if(quote) {
        const updatedOne = await Quote.findByIdAndUpdate(id,{ name,text });
        res.status(201).json(updatedOne);
    }
    else {
        res.staus(401);
        throw new Error('No Quote Found.')
    }
});

const getAllQuotes = asyncHandler(async(req,res) => {
    const id = req.user._id;
    console.log(req.user.name);
    const quotes = await Quote.find({user:id});
    res.status(201).json(quotes);
});

module.exports = {
    createQuote,
    deleteQuote,
    updateQuote,
    getAllQuotes
}
