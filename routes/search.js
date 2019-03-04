const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../helpers/middlewares')

const User = require('../models/user');

/* GET User List */

router.get('/', isLoggedIn(),(req, res, next) => {
  let loggedUserId = req.session.currentUser.username;
  User.find({username:{$ne: loggedUserId}})
  .then((userList)=>{
    res.status(200);
    res.json(userList);
  })
  .catch(next);
})

module.exports = router;