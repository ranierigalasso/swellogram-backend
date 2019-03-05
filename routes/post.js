const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../helpers/middlewares')

const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

/* GET Post by ID */

router.get('/:id', isLoggedIn(), (req, res, next) => {
  const { id } = req.params;
  Post.findById(id)
  .populate('creatorId')
    .then((post) => {
      res.status(200);
      res.json(post);
    })
    .catch(next);
})

/* POST delete by ID */

router.post('/:id',isLoggedIn(), (req, res, next) => {
  const { id } = req.params;
  Post.findByIdAndDelete(id)
    .then((post) => {
      res.status(200);
      res.json(post);
    })
    .catch(next);
})

/* GET Post by ID in Edit */

router.get('/:id/edit', isLoggedIn(),(req, res, next) => {
  const { id } = req.params;
  Post.findById(id)
    .then((post) => {
      console.log(post)
      res.status(200);
      res.json(post);
    })
    .catch(next);
})

/* POST edit by ID */

router.put('/:id/edit', isLoggedIn(), (req, res, next) => {
  const { id } = req.params;
  const { location, imageUrl, description} = req.body;
  console.log(imageUrl)
  const post = {
    location,
    imageUrl,
    description,
  }
  Post.findByIdAndUpdate(id, {$set:{'location':location, 'imageUrl':imageUrl, 'description':description}})
    .then((post) => {
      res.status(200);
      res.json(post);
    })
    .catch(next);
})

/*POST create new comment */

router.post('/:id/comment', isLoggedIn(), (req, res, next) => {
  const { userId, comment} = req.body.data;
  const { id }= req.params;
  const data ={
    creatorId: userId,
    postId: id,
    comment,
  }
  Comment.create(data)
    .then((response) => {
      res.json(response);
      res.status(200);
    })
    .catch(next)
})


/* GET Get comments by post ID */

router.get('/:id/comment', isLoggedIn(), (req, res, next) => {
  const { id } = req.params;
  Comment.find({postId:id}).sort({createdAt: -1})
  .populate('creatorId')
    .then((comments) => {
      // console.log(comments)
      res.status(200);
      res.json(comments);
    })
    .catch(next);
})

/* DELETE Delete comment  by comment ID*/

router.post('/:id/comment/delete',isLoggedIn(), (req, res, next) => {
  const { id } = req.params;
  const { commentId } = req.body;
  console.log(req.body)
  Comment.findByIdAndDelete({_id:commentId})
    .then((response) => {
      console.log(response)
      res.status(200);
      res.json(response);
    })
    .catch(next);
})

/*POST Add a like */

router.post('/:id/like', isLoggedIn(), (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;
  Post.findById({_id:id})
    .then((response) => {
      if(response.likers.includes(userId)){
        Post.findByIdAndUpdate({_id:id},{$pull:{likers:userId}},{new:true})
          .then(() => {
            Post.findByIdAndUpdate({_id:id},{$inc:{likes:-1}},{new:true})
              .then((response) => {
                res.status(200);
                res.json(response);
              })
              .catch(next)
          })
          .catch(next) 
      } else {
        Post.findByIdAndUpdate({_id:id},{$push:{likers:userId}},{new:true})
          .then(() => {
            Post.findByIdAndUpdate({_id:id},{$inc:{likes:1}},{new:true})
              .then((response) => {
                res.status(200);
                res.json(response);
              })
              .catch(next)
          })
          .catch(next)  
      }
    })
    .catch(next)
})

/* GET Likes of a Post */

router.get('/:id/like', isLoggedIn(),(req, res, next) => {
  const { id } = req.params;
  Post.findById(id)
    .then((post) => {
      // console.log(post)
      res.status(200);
      res.json(post);
    })
    .catch(next);
})

module.exports = router;


