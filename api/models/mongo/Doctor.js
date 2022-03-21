const mongoose = require('mongoose')
const { Schema, model } = mongoose

const DoctorSchema = new Schema({
  department: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  }
})

const DoctorModel = model('Doctor', DoctorSchema)

module.exports = { DoctorModel, DoctorSchema }