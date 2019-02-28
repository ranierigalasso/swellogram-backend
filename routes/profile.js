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


module.exports = router;