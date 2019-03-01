const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Post = require('../models/post');

/* GET feed */

router.get('/', (req, res, next) => {
  const { username } = req.session.currentUser;
  const userFeedIds = [];
  User.find({username})
  .then((data) => {
    userFeedIds.push(data[0]._id);
    data[0].following.map((id) => {
      userFeedIds.push(id)
    })
    Post.aggregate([{$match: {creatorId: {$in: userFeedIds}}}]).sort({createdAt: -1})
    .then((data) => {
      User.populate(data, {path:'creatorId'})
        .then((data) => {
          res.json(data).status(200)
        })
        .catch(next)
    })
    .catch(next)
  })
  .catch(next);
})

module.exports = router;
