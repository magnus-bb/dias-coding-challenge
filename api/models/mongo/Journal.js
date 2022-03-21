const mongoose = require('mongoose')
const { Schema/*, model*/ } = mongoose

const JournalSchema = new Schema({
  cpr: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  }
})

// const JournalModel = model('Journal', JournalSchema)

module.exports = { /* JournalModel,*/ JournalSchema }