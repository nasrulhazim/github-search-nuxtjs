const express = require('express')

const app = express()
const mysql = require('mysql') 
const cors = require('cors')
const bodyParser = require('body-parser')
// const getRawBody = require('raw-body')
 
app.use(cors())
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: true
}));
app.use(bodyParser.json({
	limit: "50mb",
	extended: true
}));;

db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'github'
})

// Require API routes
const github = require('./routes/github')
const test = require('./routes/test')

// Import API Routes
app.use(github)
app.use(test)

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`)
  })
}