require('dotenv').config()
const express = require('express')
const users = require('./Routes/user.js');
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
/** Start Importing Routes */
app.use("/users", users);
/** End Importing Routes */

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
