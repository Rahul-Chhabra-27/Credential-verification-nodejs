const errorMiddleware = (err,req,res,next) => {
    console.log("Inside error middleware");
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode).json({
        message:err.message,
        stack : process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = errorMiddleware;