const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Post = require('../models/post');

/*PUT Update Status */

router.put('/', (req, res, next) => {
  let { _id } = req.session.currentUser;
  let { status } = req.body;
  User.findByIdAndUpdate({_id},{profileStatus:status},{new:true})
  .then((status) => {
    res.status(200);
    console.log(status)
    res.json(status);
  })
  .catch(next);
})
module.exports = router;
