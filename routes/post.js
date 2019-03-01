const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Post = require('../models/post');

/* GET Post by ID */

router.get('/:id', (req, res, next) => {
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

router.post('/:id', (req, res, next) => {
  const { id } = req.params;
  Post.findByIdAndDelete(id)
    .then((post) => {
      res.status(200);
      res.json(post);
    })
    .catch(next);
})

/* GET Post by ID in Edit */

router.get('/:id/edit', (req, res, next) => {
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

router.put('/:id/edit', (req, res, next) => {
  const { id } = req.params;
  const { location, imageUrl, description} = req.body;
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


module.exports = router;


