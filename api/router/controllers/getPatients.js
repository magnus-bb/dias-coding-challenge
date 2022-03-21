const { AdmissionModel } = require('../../models/mongo/Admission.js')

module.exports = async (req, res) => {
  let patients = []

  try {
    // We get the doctor ID from params
    const { doctorId } = req.query

    if (!doctorId) {
      res.status(400).json({ message: 'you must supply a doctorId' })
      return
    }

    // Find all admissions that have the specified doctor assigned
    const admissionDocs = await AdmissionModel.find({ doctors: doctorId })
    
    // We are only interested in the patients of the admission, so we unpack the journal
    patients = admissionDocs.map(admission => admission.journal)

  } catch (err) {
    res.status(400).json({ message: err.message })
    return
  }
  
  res.status(200).json(patients)
}