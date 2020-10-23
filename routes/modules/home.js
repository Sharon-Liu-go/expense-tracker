const express = require("express")
const router = express.Router()

const Record = require('../../models/expense-tracker')

router.get('/', (req, res) => {
  res.render('index')
})




module.exports = router
