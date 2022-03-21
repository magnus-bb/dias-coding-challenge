module.exports = class Journal {
  #cpr
  #name

  constructor(name, cpr) {
    if (!name || !cpr) throw new Error('you must supply a name and a cpr number when creating a journal') // remember to handle this

    this.#cpr = cpr
    this.#name = name
  }

  get cpr() {
    return this.#cpr
  }

  get name() {
    return this.#name
  }

  // saveToDb() {
  //   const doc = new JournalModel({ name: this.name, cpr: this.cpr })

  //   return doc.save()
  // }
}