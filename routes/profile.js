const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Post = require('../models/post');

/* GET Profile */

router.get('/', (req, res, next) => {
  let userId = req.session.currentUser._id;

  // db.posts.find({creatorId: ObjectId("5c76782dbc407f7794a22d03")}).pretty()


  Post.find({creatorId:userId})
    .then((postList) => {
      res.status(200);
      res.json(postList);
    })
    .catch(next)
})

module.exports = router;