const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Post = require('../models/post');

/* GET My Profile */

router.get('/me', (req, res, next) => {
  let userId = req.session.currentUser._id;
  Post.find({creatorId:userId})
    .then((postList) => {
      res.status(200);
      res.json(postList);
    })
    .catch(next)
})

/* GET Profiles of Users */

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user)=>{
      Post.find({ creatorId: user._id })
        .then((postList) => {
          let data = [ postList, user ];
          res.status(200);
          res.json(data);
        })
        .catch(next)
    })
    .catch(next);
})

/* POST Follow Users */

router.post('/:id/follow', (req, res, next) => {
  const { loggedUsername } = req.body;
  const { id } = req.params;
  User.findOneAndUpdate({username:loggedUsername},{$push:{following:id}},{new:true})
    .then((user) => {
      req.session.currentUser = user;
      res.json(user).status(200);
    })
    .catch(next)
})

/* POST Unfollow Users */

router.post('/:id/unfollow', (req, res, next) => {
  const { loggedUsername } = req.body;
  const { id } = req.params;
  User.findOneAndUpdate({username:loggedUsername},{$pull:{following:id}},{new:true})
    .then((data) => {
      req.session.currentUser = data;
      res.json(data).status(200);
    })
    .catch(next)
})

module.exports = router;