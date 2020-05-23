const path = require('path')
const fs = require('fs')
const express = require('express')
const app = express()

const messagesPath = './messages.txt'

// set the middleware
app.use(express.json())

// serve static
var staticPath = path.join(__dirname, 'static')
app.use(express.static(staticPath))

// serve Get
app.get('/messages', (req, res) => {
  fs.readFile(messagesPath, 'utf8', (err, data) => {
    if (err) {
      console.log(`unable to read file this is ${messagesPath}`)
      return res.send(err)
    }

    // console.log(data.split('\n').filter(line => line), 'this is text')

    // res.send sets the header information
    const jsonData = data.split('\n').filter(line => line).map(JSON.parse)

    res.json(jsonData)

 
  
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
