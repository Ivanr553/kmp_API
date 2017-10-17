const express = require('express')
const router = express.Router()

router.post('/', function(req, res) {
  console.log(req.body.message)

  res.send({message: 'Request received'})
});

module.exports = router
