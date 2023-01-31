const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },

  pageCount: {
    type: Number,
    required: true
  }
})




module.exports = mongoose.model('Book', bookSchema)