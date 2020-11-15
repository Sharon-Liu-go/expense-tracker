const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense-tracker', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb eroor!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db

