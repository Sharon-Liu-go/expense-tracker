const express = require("express")
const router = express.Router()

const Record = require('../../models/record')

router.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => {
      res.render('index', {
        records
      })
    })
    .catch(error => console.error(error))

})

// router.get("/", (req, res) => {
//   Todo.find()
//     .lean()
//     .sort({ _id: "asc" })
//     .then(todos => res.render('index', { todos }))
//     .catch(error => console.error(error))
// })


module.exports = router
