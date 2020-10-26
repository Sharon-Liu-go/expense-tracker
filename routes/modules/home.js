const express = require("express")
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const sharon = req.query.categories
  console.log(sharon)
  console.log(Record)
  let categories = Category.find().lean().then((category) => {
    categories = category
  })

  Record.find()
    .lean()
    .then((records) => {
      res.render('index', { records, categories })
    })
    .catch(error => console.error(error))

})

router.post('/category', (req, res) => {
  console.log('good')
  // let categories = Category.find().lean().then((category) => {
  //   categories = category
  // })
  // Record.find()
  //   .lean()
  //   .then((records) => {
  //     res.render('index', { records, categories })
  //   })
  //   .catch(error => console.error(error))

})

module.exports = router
