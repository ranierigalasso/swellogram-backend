const express = require('express');
const router = express.Router();

const Post = require('../models/post');

/* POST create */

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
    .then()
    .catch(next)
})

module.exports = router;