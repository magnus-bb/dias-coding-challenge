const { AdmissionModel } = require('./mongo/Admission.js')

/*
Like the Doctor class, this could handle way more logic if the application was larger,
such as manipulating the assignment of Doctors etc. through the class.
*/

module.exports = class Admission {
  #department
  #doctors = []
  #journal

  constructor({ department, journal, doctors = null }) {
    if (!department || !journal) throw new Error('you must supply a department and a journal when creating an admission') // actually also handled by mongoose

    this.#department = department
    this.#journal = journal // journal is an object literal, we don't actually need to instantiate it before saving to DB
    
    // Does not need to be initialized with doctors
    if (doctors && doctors.length) {
      this.#doctors = doctors
    }
  }

  get department() {
    return this.#department
  }

  get doctors() {
    return this.#doctors
  }

  get journal() {
    return this.#journal
  }

  saveToDb() {
    const admission = new AdmissionModel({ department: this.department, doctors: this.doctors, journal: this.journal })

    return admission.save()
  }
}