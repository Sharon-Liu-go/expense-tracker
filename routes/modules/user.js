const express = require("express")
const router = express.Router()
const User = require('../../models/user')


router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  let { email, password } = req.body

  User.find

  res.render('login')
})




router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  let { name, email, password, confirmPassword } = req.body

  User.findOne({ email })
    .lean()
    .then(user => {
      //已註冊過
      if (user) {
        console.log('this email has already existed')
        res.render('register', name, email, password, confirmPassword)
      } else {
        //尚未註冊，但密碼與確認密碼不相符
        if (password !== confirmPassword) {
          console.log('password與confirmPassword不一致')
          res.render('register', name, email, password, confirmPassword)
        } else {
          //尚未註冊，密碼與確認密碼相符，加入註冊，並進入login頁面
          return User.create({ name, email, password })
            .then(() => res.redirect('/users/login'))
            .catch(error => console.group(error))
        }
      }

    })
  res.render('register')
})




module.exports = router