const { DoctorModel } = require('../../models/mongo/Doctor.js')
const { AdmissionModel } = require('../../models/mongo/Admission.js')

module.exports = async (req, res) => {
  let document
  try {
    const { doctorId, patientCpr } = req.body

    const [ doctorDoc, admissionDoc ] = await Promise.all([
      DoctorModel.findById(doctorId),
      AdmissionModel.findOne({ 'journal.cpr': patientCpr }) // We assume there will always only be one admission per patient
    ])
    
    //TODO
    /*
    error if doctorDoc.department is not in the same as admissionDoc.journal.department and send 400
    ? create doctor instance from Doctor?
    use mongoose .update() with $push() to just add doctor ID to doctors array
    !EDIT admission schema to not have whole Doctors copied, but just array of DoctorIDS (however mongo does relations)
    */
   document = { doctorDoc, admissionDoc }

  } catch (err) {
    res.status(400).json({ message: err.message })
  }
  
  res.status(201).json(document)
}