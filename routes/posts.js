const router = require('express').Router();
const mongoose = require('mongoose');
// const Post  = mongoose.model("Post");
// const Post = require('../model/Post');
// const Post = require('../model/Post');
// // Models
require('../mongo');
const Post = require('../model/Post');
const Comment = require('../model/Comment');

router.get('/', async (req, res) => {
    console.log("*** request **",req.name)
    try{
        const posts = await Post.find({});
        res.send(posts)
    }catch(error){
        res.status(500)
    }    
});

router.get('/:postId', async (req, res) => {
    try{
        const post = await Post.findOne({_id: req.params.postId});
        res.send(post);

    }catch(error){
        res.status(500)
    }    
})


router.put('/:postId', async (req, res) => {
    try{
        const post = await Post.findByIdAndUpdate(
                                    {_id: req.params.postId},
                                    req.body,
                                    { new:true, runValidators:true }
                                );
        res.send(post);

    }catch(error){
        res.status(500)
    }    
})


router.delete('/:postId', async (req, res) => {
    try{
        const post = await Post.findByIdAndRemove(
                                    {_id: req.params.postId}                                   
                                );
        res.send(post);

    }catch(error){
        res.status(500)
    }    
})


router.post('/', async (req, res) => {
    console.log(req.body);
    // try{
        const post = new Post();
        post.title = req.body.title;
        post.content = req.body.content;
        await post.save();
        res.send(post);

    // }catch(error){
    //     res.status(5000).json({message:"error"})
    // }
})


// Create Comment
router.post('/:postId/comment', async(req, res) => {
    
    // Find a post
    const post = await Post.findOne({_id:req.params.postId});

    //create comment
    const comment = new Comment()
    comment.content = req.body.content;
    comment.post = post._id
    await comment.save();


    // Assciate post with comment
    post.comments.push(comment._id);
    await post.save();

    res.send({
        ok:comment
    })
});



router.get('/:postId/comment', async (req, res) => {
    const post = await Post.findOne({_id:req.params.postId}).populate(
        {
            path: 'comments',
            select: 'content',
            model: 'Comment',
            options: {
                sort:{ },
                skip: 2,
                limit: 5
            },
            match:{
                // filter result in case of multiple result in populate
                // may not useful in this case
            }
        }
        // "comments"
        );
    res.send(post);

})


// PUT / UPDATE
router.put('/comment/:commentId', async (req, res) => {
    const comment = await Comment.findByIdAndUpdate(
        {
           _id:req.params.commentId
        }, 
        req.body,
        { new:true, runValidators:true }
    );
    res.send(comment);

})

// DELETE
router.delete('/comment/:commentId', async (req, res) => {
    const comment = await Comment.findByIdAndRemove(req.params.commentId);
    res.send({message:"Comment successfully deleted"})
})

module.exports = router;