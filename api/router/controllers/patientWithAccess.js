const { AdmissionModel } = require('../../models/mongo/Admission.js')

module.exports = async (req, res) => {
  let patient

  try {
    // We need both a doctor and patient, so we get those from params
    const { doctorId, patientCpr } = req.query

    // Both must be supplied, obviously
    if (!doctorId) {
      res.status(400).json({ message: 'you must supply a doctorId' })
      return
    }
    if (!patientCpr) {
      res.status(400).json({ message: 'you must supply a patientCpr' })
      return
    }

    // We assume a patient can only be admitted once at a time, so we get the first admission we can find with given cpr
    const admissionDoc = await AdmissionModel.findOne({ 'journal.cpr': patientCpr })

    // If the doctor is not assigned to the found patient, don't even talk to me
    if (!admissionDoc.doctors.includes(doctorId)) {
      res.status(403).json({ message: `doctor with id: ${doctorId} does not have access to patient with CPR: ${patientCpr}` })
      return
    }

    patient = admissionDoc

  } catch (err) {
    res.status(400).json({ message: err.message })
    return
  }
  
  res.status(200).json(patient)
}