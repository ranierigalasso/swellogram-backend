const express = require('express');
const router = express.Router();

const Post = require('../models/post');

/* POST create post */

router.post('/', (req, res, next) => {
  const { location, imageUrl, description} = req.body;
  const creatorId = req.session.currentUser._id;
  const post = {
    creatorId,
    location,
    imageUrl,
    description,
  }
  Post.create(post)
    .then((data) => {
    res.json(data).status(200);
    })
    .catch(next)
})

module.exports = router;