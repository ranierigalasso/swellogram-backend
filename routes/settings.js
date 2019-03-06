const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../helpers/middlewares')

const User = require('../models/user');

/*PUT Update Status */

router.put('/', isLoggedIn(), (req, res, next) => {
  let { _id } = req.session.currentUser;
  let { status } = req.body;
  User.findByIdAndUpdate({_id},{profileStatus:status},{new:true})
  .then((status) => {
    res.status(200);
    res.json(status);
  })
  .catch(next);
})
/*POST Change profile pic */
router.post('/picture', isLoggedIn(),(req,res,next) => {
  const{ id, url} = req.body.data;
  User.findByIdAndUpdate({_id:id},{profileImg:url},{new:true})
    .then((response) => {
      req.session.currentUser = response;
      res.status(200);
      res.json(response);
    })
    .catch(next)
})

module.exports = router;
