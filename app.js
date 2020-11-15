const express = require("express")
const port = 3020
const app = express()

const routes = require("./routes")
const methodOverride = require("method-override")
require('./config/mongoose')
const session = require('express-session')
const usePassport = require('./config/passport')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const flash = require('connect-flash')   // 引用套件


app.use(session({
  secret: 'ThisIsDadSecret',
  resave: false,  //會在每一次與使用者互動後，強制把 session 更新到 session store 裡。
  saveUninitialized: true //強制將未初始化的 session 存回 session store。未初始化表示這個 session 是新的而且沒有被修改過，例如未登入的使用者的 session。
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