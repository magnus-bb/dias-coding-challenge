const mongoose = require('mongoose')
const { Schema } = mongoose

// We just use this scheme in Admissions

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

module.exports = { JournalSchema }