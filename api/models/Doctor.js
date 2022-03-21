const { DoctorModel } = require('./mongo/Doctor.js')

/*
This whole class is kind of superfluous,
since there is no real logic with Doctors that is not directly related to 
the database, in which case Mongoose can do the basics.

But it would probably be useful in a larger application.
The same goes for a Journal class and Department class, that I actually deleted because they was not at all needed.
*/

module.exports = class Doctor {
  #id // is set by database
  #name
  #department

  constructor({ name, department }) {
    if (!name || !department) throw new Error('you must supply a name and a department when creating a doctor') // remember to handle this

    this.#name = name
    this.#department = department
  }

  get id() {
    return this.#id
  }

  #setId(id) {
    this.#id = id
  }

  get name() {
    return this.#name
  }

  get department() {
    return this.#department
  }

  saveToDb() {
    const doc = new DoctorModel({ name: this.name, department: this.department })

    return doc.save()
  }
}