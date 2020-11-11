const express = require("express")
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const categorySelected = req.query.categories

  console.log(`篩選:${categorySelected}`)

  let categories = Category.find().lean().then((category) => {
    return categories = category
  })

  Record.find()
    .lean()
    .then((records) => {

      let recordsFiltered = records.filter(record => record.category === categorySelected)
      let recordsData = categorySelected ? recordsFiltered : records
      console.log(recordsData)
      let totalAmount = 0
      recordsData.forEach(data => totalAmount += data.amount)
      res.render('index', { recordsData, categories, categorySelected, totalAmount })
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
