const express = require('express');
const router = express.Router();

const User = require('../models/user');

/* GET User List */

router.get('/', (req, res, next) => {
  User.find({})
  .then((userList)=>{
    console.log(userList);
    res.status(200);
    res.json(userList);
  })
  .catch(next);
})

module.exports = router;