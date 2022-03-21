require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()

const startRouter = require('./router/router.js')

      
main().catch(err => console.error(err))

async function main() {
  app.use(cors())
  app.use(express.json())

  await mongoose.connect('mongodb://mongo:27017')

  startRouter(app)

  const port = process.env.PORT || 8080

  app.listen(port, () => {
    console.log('listening on port ' + port)
  })
}