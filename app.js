const express = require("express")
const port = 3000
const app = express()
const routes = require("./routes")
const methodOverride = require("method-override")
require('./config/mongoose')
const exphbs = require('express-handlebars')

app.engine('exphbs', exphbs({ defaultLayout: 'main', extname: 'exphbs' }))
app.set('view engine', 'exphbs')


app.use(methodOverride('_method'))


app.listen(port, () => {
  console.log(`the server is listening on http://localhost:${port}`)
})