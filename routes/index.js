const express = require("express")
const router = express.Router()
const home = require('./modules/home')
const expense = require('./modules/expense')
const user = require('./modules/user')
const { authenticator } = require('../middleware/auth')  // 掛載 middleware
const auth = require('./modules/auth')




router.use('/expense', authenticator, expense)
router.use('/user', user)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router
