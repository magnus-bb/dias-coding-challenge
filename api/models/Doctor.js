// const { nanoid } = require('nanoid')
const { DoctorModel } = require('./mongo/Doctor.js')

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