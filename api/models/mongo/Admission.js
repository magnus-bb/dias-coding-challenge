const mongoose = require('mongoose')
const { Schema, model } = mongoose
const { JournalSchema } = require('./Journal.js')

const AdmissionSchema = new Schema({
  department: {
    type: String,
    required: true
  },
  doctors: [{ 
    type: Schema.Types.ObjectId,
    ref: 'Doctor'
  }],
  journal: {
    type: JournalSchema,
    required: true
  }
})

const AdmissionModel = model('Admission', AdmissionSchema)

module.exports = { AdmissionModel }