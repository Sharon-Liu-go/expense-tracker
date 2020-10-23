const express = require("express")
const router = express.Router()
const home = require('./modules/home')
const expesneTracker = require('./modules/expense-tracker')


router.use('/', home)
router.use('/expenseTracker', expesneTracker)

module.exports = router
