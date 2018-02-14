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

let text = `I believe in barbecue. As soul food and comfort food and health food, as a cuisine of both solace and celebration. When I’m feeling good, I want barbecue. And when I’m feeling bad, I just want barbecue more. I believe in barbecue in all its regional derivations, in its ethnic translations, in forms that range from white-tablecloth presentations of cunningly sauced costillas, to Chinese take-out spareribs that stain your fingers red, to the most authentic product of the tar-paper rib shacks of the Deep South. I believe that like sunshine and great sex, no day is bad that has barbecue in it.`

app.use(express.static('public'));
app.use(bodyParser.json());

io.on('connect', function(socket){
  console.log('rooms',room)
  console.log('numplaerys',numPlayers) 

  let roomNum = Math.floor(room++ / 6);
  let playerNum = (room % 6)/2

  socket.join(`${roomNum}`);
  socket.emit('init',JSON.stringify({room:roomNum,player:playerNum, text:text}));
  
  socket.on('msg',function(msg){
    console.log(msg)
  })

  // Assign socket to a room of 3 players
  socket.join(`${roomNum}`);
  socket.emit('join',`Server: You just joined room ${roomNum}`);


  // Listen for message from client
  socket.on('gameMessage',(msg)=>{
    handlerFactory(msg,socket,io)
  });

  // Broadcast to all sockets in a room
  io.to(`${roomNum}`).emit('number of players', (numPlayers++ % 6)/2 + 1);
});

http.listen(3000, function(){
  console.log('listening on 3000');
});
