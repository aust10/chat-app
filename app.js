const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const path = require('path')
const fs = require('fs')

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

    const jsonData = data.split('\n').filter(line => line).map(JSON.parse)
    return res.json(jsonData)
  })
})

// serve post
// app.post('/messages', (req, res) => {
//   // console.log(JSON.stringify(req.body), 'this is req.body')
//   // console.log(Object.keys(req.body), 'keys of the object')
//   fs.appendFile(messagesPath, JSON.stringify(req.body) + '\n', (err) => {
//     if (err) return res.send(err)
//   })
//   res.send(req.body)
// })

function WriteMessage (message) {
  fs.appendFile(messagesPath, JSON.stringify(message) + '\n', (err) => {
    if (err) return 'error'
  })
  return 'success'
}

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'static'))
// })

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
    const didWrite = WriteMessage(msg)
    console.log('did write ' + didWrite + ' ' + msg)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

http.listen(8000)
console.log('listening on 8000')
