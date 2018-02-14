const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
var io = require('socket.io')(http);
const raceHandler = require('./socketHandlers/raceHandler.js');

let room = 0;
let numPlayers = 0;
let handlerFactory = raceHandler();

let text = `I believe in barbecue. As soul food and comfort food and health food, as a cuisine of both 
solace and celebration. When I’m feeling good, I want barbecue. And when I’m feeling bad, I just want 
barbecue more.`

app.use(express.static('public'));
app.use(bodyParser.json());

io.on('connect', function(socket){ 
  let roomNum = Math.floor(room++ / 6);
  let playerNum = (room % 6)/2;

  // Assign socket to a room of 3 players
  socket.join(`${roomNum}`);
  socket.emit('init',JSON.stringify({room:roomNum,player:playerNum, text:text}));
  socket.emit('join',`Server: You just joined room ${roomNum}`);

  // Listen for message from client
  socket.on('gameMessage',(msg)=>{
    handlerFactory(msg,socket,io)
  });

  // Broadcast to all sockets in a room
  io.to(`${roomNum}`).emit('number of players', ((numPlayers++ % 6) + 1)/2);
  console.log('Rooms: ',room)
  console.log('Number of Players: ',numPlayers)
});

http.listen(process.env.PORT, function(){
  console.log('listeneing on ' + process.env.PORT);
});
