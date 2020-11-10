const Record = require('../record')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongoose connected!')

  Record.create(
    {
      name: "好神拖",
      category: "家居物業",
      icon: "fas fa-home",
      date: '2020/10/23',
      amount: '10000',
    },
    {
      name: "捷運",
      category: "交通出行",
      icon: "fas fa-shuttle-van",
      date: '2020/10/23',
      amount: '1280',
    },
    {
      name: "聚餐",
      category: "休閒娛樂",
      icon: "fas fa-grin-beam",
      date: '2020/10/23',
      amount: '700',
    },
    {
      name: "午餐",
      category: "餐飲食品",
      icon: "fas fa-utensils",
      date: '2020/10/23',
      amount: '85',
    },
    {
      name: "罰款",
      category: "其他",
      icon: "fas fa-pen",
      date: '2020/10/23',
      amount: '500',
    }
  )
  console.log('done')
})