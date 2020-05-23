/* globals prompt */
const { getMessages } = require('./fetch-messages')
const { Chat } = require('./components')
const yo = require('yo-yo')
const io = require('socket.io-client')

const socket = io()

const nickname = prompt('Enter your nickname:')

// set up a listner for chat message
// socket.on('chat message, msg => something)
// this something will be update state passing in new array state.messages.concat message

// this is omited by the above 
// function refresh () {
//   getMessages()
//     .then(data => {
//       console.log('fetched data from server')
//       updateState('messages', data)
//     })
// }

const sendForm = document.getElementById('send-message')
const messageTextField = document.getElementById('message-text')
sendForm.onsubmit = evt => {
  evt.preventDefault()
  // const message = { text: messageTextField.value, nick: nickname, room: state.room, date: new Date() }
  // socket.emit('chat message', message)
  // make the message object {text nick room date}
  socket.emit('chat message', messageTextField.value, nickname, state.room)
  console.log(messageTextField.value, nickname, state.room)
  // postMessage(messageTextField.value, nickname, state.room)
}

const state = {
  room: '',
  messages: []
}

function updateState (key, value) {
  state[key] = value
  yo.update(el, Chat(state.messages, state.room, updateState))
}

const el = Chat(state.messages, state.room, updateState)
const chatContainer = document.getElementById('chat-container')
chatContainer.appendChild(el)

// setInterval(refresh, 500)
