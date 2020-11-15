const express = require("express")

const app = express()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


const routes = require("./routes")
const methodOverride = require("method-override")

const session = require('express-session')
const usePassport = require('./config/passport')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const flash = require('connect-flash')   // 引用套件


const port = process.env.PORT
require('./config/mongoose')

app.use(session({
  secret: 'ThisIsMyDadSecret',
  resave: false,
  saveUninitialized: true
}))

usePassport(app)

app.use(flash())  // 掛載套件
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  res.locals.error = req.flash('error') // 新增 error flash

  next()
})


app.use(bodyParser.urlencoded({ extended: true }))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(methodOverride('_method'))


app.use(routes)



app.listen(port, () => {
  console.log(`the server is listening on http://localhost:${port}`)
})