const mongoose  = require('mongoose');

const post_schmea = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: "Comment is required"
    }]
},{
    timestamps:true
})

module.exports = mongoose.model("Post",post_schmea);