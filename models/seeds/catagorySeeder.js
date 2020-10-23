const Record = require('..//record')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongoose connected!')

  Record.create({
    category: '家居物業',
    category: '交通出行',
    category: '休閒娛樂',
    category: '餐飲食品 ',
    category: '其他',
  })
  console.log('done')
  db.close()
})