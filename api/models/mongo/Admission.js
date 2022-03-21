const mongoose = require('mongoose')
const { Schema, model } = mongoose
const { DoctorSchema } = require('./Doctor.js')
const { JournalSchema } = require('./Journal.js')

const AdmissionSchema = new Schema({
  department: {
    type: String,
    required: true
  },
  doctors: [ DoctorSchema ], // CHANGE TO OBJECT ID OF DOCTORS INSTEAD
  journal: {
    type: JournalSchema,
    required: true
  }
})

const AdmissionModel = model('Admission', AdmissionSchema)

module.exports = { AdmissionModel }