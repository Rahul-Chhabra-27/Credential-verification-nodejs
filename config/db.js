const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const color = require('cli-color');

const connectDb = asyncHandler(async () => {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(color.underline.yellow(`MongoDb conected : ${connect.connection.host}`));
});

module.exports = connectDb;