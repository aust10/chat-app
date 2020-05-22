const path = require('path')
const fs = require('fs')
// const bodyParse = require('body-parser')
const express = require('express')
const app = express()

const messagesPath = './messages.txt'

// app.use(express.static(''))

// set the middleware
app.use(express.json())

// serve static
var staticPath = path.join(__dirname, 'static')
app.use(express.static(staticPath))

// serve Get
app.get('/messages', (req, res) => {
  fs.readFile(messagesPath, 'utf8', (err, messages) => {
    if (err) {
      console.log(`unable to read file this is ${messagePath}`)
      return res.send(err)
    }
    // res.json(messages)

    // console.log(messages.split('\n').filter(line => line))
    res.json(messages.split('\n').filter(line => line))
  })
})

// serve post
app.post('/messages', (req, res) => {
  console.log(JSON.stringify(req.body), 'this is req.body')
  console.log(Object.keys(req.body), 'keys of the object')
  fs.appendFile(messagesPath, JSON.stringify(req.body) + '\n', (err) => {
    if (err) return res.send(err)
  })
  res.send(req.body)
})

app.listen(8000)
console.log('listening on 8000')
