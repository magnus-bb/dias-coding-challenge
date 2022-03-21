const { DoctorModel } = require('../../models/mongo/Doctor.js')
const { AdmissionModel } = require('../../models/mongo/Admission.js')

module.exports = async (req, res) => {
  try {
    // Unpack params we need
    const { doctorId, patientCpr } = req.body

    // Find associated doctor and patient from db
    const [ doctorDoc, admissionDoc ] = await Promise.all([
      DoctorModel.findById(doctorId),
      AdmissionModel.findOne({ 'journal.cpr': patientCpr }) // We assume there will always only be one admission per patient
    ])

    //TODO: create a robust error controller for this stuff
    // Send an error if either doctor or patient is nowhere to be found in db
    let missingDocError
    if (!doctorDoc) {
      missingDocError = 'cannot find doctor with ID: ' + doctorId
    }
    if (!admissionDoc) {
      missingDocError = 'cannot find patient admission with CPR: ' + patientCpr
    }
    if (missingDocError) {
      res.status(400).json({ message: missingDocError })
      return
    }

    //TODO: comparison service + error controller
    // We assume that doctors cannot be assigned to patients of another department, so if departments don't match, stop the assignment
    if (doctorDoc.department.toLowerCase() !== admissionDoc.department.toLowerCase()) {
      res.status(400).json({ message: `doctor with ID: ${doctorId} from department: ${ doctorDoc.department } does not have access to patient with CPR: ${patientCpr} in department: ${ admissionDoc.department }` })
      return
    }

    // Add the doctor to admission.doctors array and save in db
    await AdmissionModel.updateOne({ 'journal.cpr': patientCpr }, { $push: { doctors: doctorId } })
    
  } catch (err) {
    res.status(400).json({ message: err.message })
    return
  }
  
  res.status(204).json()
}