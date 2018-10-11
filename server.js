const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('express-async-errors');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');
// database connection
// require('./mongo');

// Models
// const Post = require('./model/Post');


 // middleware
app.use(bodyParser.json());
app.use(morgan("combined"));

app.use((req, res,next) =>{
    req.name = 'nitin';
    next(); 
});

app.use("/post",postRoutes);
app.use("/user",userRoutes)



// Not found routes
app.use((req, res, next) => {
    req.status = 404;
    const error  = new Error("Routes not found")
    next(error)
});

if(app.get("env") == "production" ){
    app.use((error, req, res, next) => {
        console.log("** Enter in error handling **")
        res.status(500).send({
            message : error.message,
            // stack:error.stack
        })
    });
    
}

app.use((error, req, res, next) => {
    console.log("** Enter in error handling **")
    res.status(500).send({
        message : error.message,
        stack:error.stack
    })
});



app.listen(7777,() => {
    console.log(" Server is running at port "+7777)
})