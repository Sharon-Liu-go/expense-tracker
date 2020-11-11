const express = require("express")
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  let categoryChosen = req.body.category
  console.log(`'icon:' ${categoryChosen} `)
  let icon = ""
  Category.findOne({ category: categoryChosen })
    .lean()
    .then(categoryItem => {
      icon = categoryItem.icon
      console.log(`icon:${icon}`)
      return Record.create(Object.assign(req.body, { icon }))
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })
})

router.get('/edit/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  let categoryChosen = req.body.category
  const id = req.params.id
  let icon = ""
  Category.findOne({ category: categoryChosen })
    .lean()
    .then(categoryItem => {
      icon = categoryItem.icon
      console.log(`icon:${icon}`)
      return Record.findById(id)
        .then(record => {
          record = Object.assign(record, req.body, { icon })
          return record.save()
        })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })

})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



module.exports = router