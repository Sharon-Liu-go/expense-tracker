const express = require("express")
const port = 3020
const app = express()

const routes = require("./routes")
const methodOverride = require("method-override")
require('./config/mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(methodOverride('_method'))


app.use(routes)



app.listen(port, () => {
  console.log(`the server is listening on http://localhost:${port}`)
})