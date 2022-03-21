const Admission = require('../../models/Admission.js')

module.exports = async (req, res) => {
  let document

  try {
    const admission = new Admission(req.body) // req.body should contain { department, journal: { cpr, name } }
    
    document = await admission.saveToDb()

  } catch (err) {
    res.status(400).json({ message: err.message })
    return
  }
  
  res.status(201).json(document)
}