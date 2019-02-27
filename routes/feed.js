const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Post = require('../models/post');

/* GET feed */

router.get('/', (req, res, next) => {
  console.log('hola from backend feed');
  Post.find({})
    .then((postList) => {
      res.status(200);
      res.json(postList);
    })
    .catch(next)
})

module.exports = router;