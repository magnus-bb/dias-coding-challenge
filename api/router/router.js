const createDoctorHandler = require('./controllers/createDoctor.js')
const admitPatientHandler = require('./controllers/admitPatient.js')
const assignDoctorHandler = require('./controllers/assignDoctor.js')
const getPatientsHandler = require('./controllers/getPatients.js')
const getDoctorsHandler = require('./controllers/getDoctors.js')
const patientWithAccessHandler = require('./controllers/patientWithAccess.js')

/* 
In here we setup all endpoints - logic is in all of the above handlers
*/ 
module.exports = function startRouter(app) {
  app.get('/patient', patientWithAccessHandler)

  app.route('/patients')
    .get(getPatientsHandler)
    .post(admitPatientHandler)
    
  app.route('/doctors')
    .get(getDoctorsHandler)
    .post(createDoctorHandler)

  app.patch('/assignDoctor', assignDoctorHandler)
}