const express = require("express")
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const Year = require('../../models/year')


router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  let { name, date, category, amount, merchant } = req.body
  // let categoryChosen = req.body.category
  let yearFilledIn = date.slice(0, 4)
  let icon = ""
  const userId = req.user._id
  console.log(req.body)
  Promise.all([
    Year.find({ year: yearFilledIn }).lean(),
    Category.findOne({ category: category }).lean()
  ])
    .then(([yearItem, categoryItem]) => {
      if (!name || !date || category == "Choose..." || !amount) {
        req.flash('warning_msg', '＊為必填欄位')
        return res.redirect('/expense/new')
      } else if (date.length !== 10 && date.indexOf(" ")) {
        req.flash('warning_msg', 'date欄位請依yyyy/mm/dd格式')
        return res.redirect('/expense/new')
      } else {

        //將未建立過的年份寫入year的資料庫
        if (yearItem.length === 0) {
          Year.create(Object.assign({ year: yearFilledIn }))
        }

        icon = categoryItem.icon

        return Record.create(Object.assign(req.body, { icon, userId }))
          .then(() => { return res.redirect('/') })
          .catch(error => console.log(error))
      }
    })
    .catch(error => console.log(error))
})
//將未建立過的年份寫入year的資料庫
//   Year.find({ year: yearFilledIn })
//     .lean()
//     .then(yearItem => {
//       if (yearItem.length === 0) {
//         return Year.create(Object.assign({ year: yearFilledIn }))
//           .then(() => res.redirect('./'))
//           .catch(error => console.log(error))
//       }
//     })

//   Category.findOne({ category: categoryChosen })
//     .lean()
//     .then(categoryItem => {

//       icon = categoryItem.icon
//       console.log(`icon:${icon}`)
//       return Record.create(Object.assign(req.body, { icon, userId }))
//         .then(() => res.redirect('/'))
//         .catch(error => console.log(error))
//     })
// })

router.get('/edit/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  let { name, date, category, amount, merchant } = req.body
  let yearFilledIn = date.slice(0, 4)
  let icon = ""
  const id = req.params.id
  console.log(req.body)

  Promise.all([
    Year.find({ year: yearFilledIn }).lean(),
    Category.findOne({ category: category }).lean(),
    Record.findById(id)
  ])
    .then(([yearItem, categoryItem, record]) => {

      if (!name || !date || category == "Choose..." || !amount) {
        req.flash('warning_msg', '＊為必填欄位')
        return res.redirect(`/expense/edit/${id}`)
      } else if (date.length !== 10 && date.indexOf(" ")) {
        req.flash('warning_msg', 'date欄位請依yyyy/mm/dd格式')
        return res.redirect(`/expense/edit/${id}`)
      } else {

        //將未建立過的年份寫入year的資料庫
        if (yearItem.length === 0) {
          Year.create(Object.assign({ year: yearFilledIn }))
        }

        icon = categoryItem.icon

        record = Object.assign(record, req.body, { icon })
        record.save()
        return res.redirect('/')

      }
    }).catch(error => console.log(error))
})

//   let categoryChosen = req.body.category
//   const id = req.params.id
//   let icon = ""
//   Category.findOne({ category: categoryChosen })
//     .lean()
//     .then(categoryItem => {
//       icon = categoryItem.icon
//       console.log(`icon:${icon}`)
//       return Record.findById(id)
//         .then(record => {
//           record = Object.assign(record, req.body, { icon })
//           return record.save()
//         })
//         .then(() => res.redirect('/'))
//         .catch(error => console.log(error))
//     })

// })

router.delete('/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  Record.findById(id)
    .then(record => record.remove())
    .then(() =>
      res.redirect('/')
    )
    .catch(error => console.log(error))
})



module.exports = router