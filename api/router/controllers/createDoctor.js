const Doctor = require('../../models/Doctor.js')

module.exports = async (req, res) => {
  let document
  
  try {
    doctor = new Doctor(req.body) // req.body should contain { name, department }
    
    document = await doctor.saveToDb()

  } catch (err) {
    res.status(400).json({ message: err.message })
    return
  }
  
  res.status(201).json(document)
}