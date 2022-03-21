const Journal = require('../../models/Journal.js')
const Admission = require('../../models/Admission.js')

module.exports = async (req, res) => {
  let document

  try {
    const admission = new Admission(req.body) // req.body should contain { department, journal: { cpr, name } }
    
    document = await admission.saveToDb()

  } catch (err) {
    res.status(400).json({ message: err.message })
  }
  
  res.status(201).json(document)
}