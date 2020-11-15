const express = require("express")
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const Year = require('../../models/year')



let currentYear = new Date().getFullYear().toString()

router.get('/', (req, res) => {
  let years = Year.find().lean().then((year) => {
    return years = year
  })
  let categories = []
  categories = Category.find().lean().then((category) => {
    return categories = category
  })
  const userId = req.user._id
  let renderData = []
  let totalAmount = 0

  Record.find({ userId })
    .lean()
    .then((records) => {
      renderData = records.filter((record) => {
        return new Date(record.date).getFullYear().toString() === currentYear
      })

      renderData.forEach(data => {
        totalAmount = totalAmount += data.amount
        return totalAmount
      })
      res.render('index', { renderData, totalAmount, categories, years })
    }).catch(error => console.error(error))

})

router.get('/filter', (req, res) => {
  let years = Year.find().lean().then((year) => {
    return years = year
  })
  let categories = []
  categories = Category.find().lean().then((category) => {
    return categories = category
  })
  const categorySelected = req.query.categories
  let yearSelected = req.query.years
  const monthSelected = req.query.months
  console.log(`篩選:類別${categorySelected}、年份${yearSelected}、月份${monthSelected}`)

  const userId = req.user._id
  Record.find({ userId })
    .lean()
    .then((records) => {
      let renderData = records
      let totalAmount = amount(records);
      let recordsFiltered = [];
      let noFoundMessage = "";

      function recordsData() {
        let recordsData = recordsFiltered.length ? recordsFiltered : records
        return recordsData
      }

      function isFound(recordsFiltered) {
        if (recordsFiltered.length === 0) {
          return false
        }
        return true
      }

      function amount(renderData) {
        let amount = 0
        renderData.forEach(data => {
          amount = amount += data.amount
        })
        return amount
      }

      function noFound() {
        noFoundMessage = "找不到資料"
        return noFoundMessage
      }

      function filter() {
        let monthResult = true
        let categoryResult = true

        if (yearSelected) {
          recordsFiltered = records.filter((record) => {
            return new Date(record.date).getFullYear().toString() === yearSelected
          })
        }

        if (monthSelected !== "全部") {
          recordsFiltered = recordsData().filter((record) => {
            return (new Date(record.date).getMonth() + 1).toString() === monthSelected
          })
          monthResult = isFound(recordsFiltered)
        }

        if (categorySelected !== "全部") {
          recordsFiltered = recordsData().filter((record) => {
            return record.category === categorySelected
          })
          categoryResult = isFound(recordsFiltered)
        }

        if (monthResult && categoryResult) {
          return 'found'
        }
        return 'noFound'
      }

      function resRender() {
        console.log(`＠＠＠＠@@@@@@@`)
        console.log(renderData)
        console.log(totalAmount)
        console.log(noFoundMessage)
        res.render('index', { renderData, categories, years, categorySelected, monthSelected, yearSelected, totalAmount, noFoundMessage })
      }


      if ((monthSelected !== "全部") || (categorySelected !== "全部") || (yearSelected !== currentYear)) {
        if (filter() === 'noFound') {
          renderData = []
          totalAmount = 0
          noFoundMessage = noFound()
          return resRender()
        }
        renderData = recordsFiltered
        totalAmount = amount(recordsFiltered)
        return resRender()
      } else {

        renderData = records.filter((record) => {
          return new Date(record.date).getFullYear().toString() === currentYear
        })
        resRender()
      }

    }).catch(error => console.error(error))



})






module.exports = router