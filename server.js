const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
var io = require('socket.io')(http, { origins: 'localhost:3000'});
const raceHandler = require('./socketHandlers/raceHandler.js');

let room = 0;
let numPlayers = 0;
let handlerFactory = raceHandler();

app.use(express.static('public'));
app.use(bodyParser.json());

io.on('connect', function(socket){
  // Assign socket to a room of 3 players
  let roomNum = Math.floor(room++ / 3)
  socket.join(`${roomNum}`);
  socket.emit('join',`Server: You just joined room ${roomNum}`);

  // Listen for message from client
  socket.on('gameMessage',(msg)=>{
    handlerFactory(msg,socket,io)
  });

  // Broadcast to all sockets in a room
  io.to(`${roomNum}`).emit('number of players', (numPlayers++ % 3) + 1);
});

http.listen(3000, function(){
  console.log('listening on 3000');
});