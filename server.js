const express = require('express');
const path = require('path');
const color = require('cli-color');
const connectDb = require('./config/db');

require('dotenv').config();
connectDb();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended : false }));


// User Route.
app.use(require('./routes/user-route/user-route'));

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'public','index.html'));
});


// Error Middleware.
app.use(require('./middlewares/error-middleware'));

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => console.log(color.underline.cyan(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)));
