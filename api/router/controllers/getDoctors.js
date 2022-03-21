const { AdmissionModel } = require('../../models/mongo/Admission.js')
const { DoctorModel } = require('../../models/mongo/Doctor.js')

module.exports = async (req, res) => {
  let doctors = []

  try {
    // Unpack the patient-to-be-found's cpr
    const { patientCpr } = req.query

    if (!patientCpr) {
      res.status(400).json({ message: 'you must supply a patientCpr' })
      return
    }

    // We assume that a patient can only be admitted once at the same time, so we just find the first admission in db with the patient's cpr
    const admissionDoc = await AdmissionModel.findOne({ 'journal.cpr': patientCpr })
    
    // We can now find all of the doctors in db that were assigned to the patient (in the admission.doctors array)
    doctors = await DoctorModel.find({ _id: { $in: admissionDoc.doctors } })

  } catch (err) {
    res.status(400).json({ message: err.message })
    return
  }
  
  res.status(200).json(doctors)
}