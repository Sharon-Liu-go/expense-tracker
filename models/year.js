const mongoose = require('mongoose')
const Schema = mongoose.Schema
const yearSchema = new Schema({
  year: {
    type: String
  }
})

module.exports = mongoose.model('Year', yearSchema)