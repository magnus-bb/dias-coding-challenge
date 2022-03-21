const createDoctorHandler = require('./controllers/createDoctor.js')
const admitPatientHandler = require('./controllers/admitPatient.js')
const assignDoctorHandler = require('./controllers/assignDoctor.js')

module.exports = function startRouter(app) {
  app.route('/patients')
    .get((req, res) => {
      res.json({
        "this": "is working"
      })
    })

    .post(admitPatientHandler)
    
    
  app.route('/doctors')
    .get((req, res) => {
      res.json({
        "this": "is working"
      })
    })

    .post(createDoctorHandler)

  app.patch('/assignDoctor', assignDoctorHandler)
}