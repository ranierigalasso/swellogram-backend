const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../helpers/middlewares')

const Post = require('../models/post');

/* POST create post */

router.post('/',isLoggedIn(), (req, res, next) => {
  const { location, imageUrl, description, lat, long} = req.body;

  const coords = [];
  coords.push(long);
  coords.push(lat);

  const creatorId = req.session.currentUser._id;
  const post = {
    creatorId,
    location,
    imageUrl,
    description,
    coords: {
      type: 'Point',
      coordinates: coords,
    },
  }
  Post.create(post)
    .then((data) => {
    res.json(data).status(200);
    })
    .catch(next)
})

module.exports = router;