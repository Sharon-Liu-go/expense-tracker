const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record')
const User = require('../../models/user')
const db = require('../../config/mongoose')
const SEED_USER = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}


db.once('open', () => {
  console.log('mongoose connected!')
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id

      return Record.create(
        {
          name: "好神拖",
          category: "家居物業",
          icon: "fas fa-home",
          date: '2020/10/23',
          amount: '10000',
          merchant: '蝦皮',
          userId: user._id

        },
        {
          name: "捷運",
          category: "交通出行",
          icon: "fas fa-shuttle-van",
          date: '2020/10/23',
          amount: '1280',
          merchant: '北捷',
          userId: user._id

        },
        {
          name: "聚餐",
          category: "休閒娛樂",
          icon: "fas fa-grin-beam",
          date: '2020/10/23',
          amount: '700',
          merchant: 'ABC餐廳',
          userId: user._id

        },
        {
          name: "午餐",
          category: "餐飲食品",
          icon: "fas fa-utensils",
          date: '2020/10/23',
          amount: '85',
          merchant: '知高便當店',
          userId: user._id

        },
        {
          name: "罰款",
          category: "其他",
          icon: "fas fa-pen",
          date: '2020/10/23',
          amount: '500',
          merchant: '管委會',
          userId: user._id
        })
        .then(() => {
          console.log('done.')
          process.exit()
        }).catch(error => { console.log(error) })

    })
})