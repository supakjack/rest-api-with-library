const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()

const migrationRoute = require('./routes/migrationRoute')
const userRoute = require('./routes/userRoute')

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res, next) => {
  res.send({ message: 'rest-api-user' })
})

app.use('/migration', migrationRoute)
app.use('/user', userRoute)

app.use(async (req, res, next) => {
  next(createError.NotFound())
})

app.use((err, req, res, next) => {
  if (err.isJoi === true) err.status = 422
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
