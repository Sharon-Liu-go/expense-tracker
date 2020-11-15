const express = require("express")
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')  // 載入套件


router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/user/login',
  failureFlash: true
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (!name || !email || !password || !confirmPassword) {
    error.push({ message: '所有欄位都需要填寫' })
  }

  if (password !== confirmPassword) {
    error.push({ message: 'password與confirmPassword不一致' })
  }

  if (errors.length) {
    return res.render('register', { name, email, password, confirmPassword, errors })
  }

  User.findOne({ email })
    .then(user => {
      //已註冊過
      if (user) {
        error.push({ message: '此Email已註冊過' })
        return res.render('register', { name, email, password, confirmPassword, errors })
      } else {
        //尚未註冊，加入資料庫，並進入login頁面
        return bcrypt
          .genSalt(10) // 產生「鹽」，並設定複雜度係數為 10
          .then(salt => bcrypt.hash(password, salt)) // 為使用者密碼「加鹽」，產生雜湊值
          .then(hash => User.create({
            name,
            email,
            password: hash // 用雜湊值取代原本的使用者密碼
          }))
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
    })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已成功登出')
  res.redirect('/user/login')
})

module.exports = router