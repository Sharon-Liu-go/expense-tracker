const express = require("express")
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  let categoryChoosed = req.body.category
  console.log(`icon:${categoryChoosed}`)
  let icon = ""
  Category.find()
    .lean()
    .then((categoryItem => { if (categoryItem.category === categoryChoosed) { icon = categoryItem.icon } }))
  console.log(`icon:${icon}`)
  // let icon = { icon: "fas fa-home" }
  let sharon = Object.assign(req.body, icon)
  console.log(`新增:${sharon}`)
  Record.create(sharon)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/edit/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(record => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
  // res.redirect('/')
})



module.exports = router