const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
var io = require('socket.io')(http, { origins: 'localhost:3000'});
const raceHandler = require('./socketHandlers/raceHandler.js');


let room = 0;

app.use(express.static('public'));
app.use(bodyParser.json());


io.on('connect', function(socket){
  let roomNum = Math.floor(room++ / 3)
  socket.join(`${roomNum}`);
  socket.emit('join',`You just joined ${roomNum}`);
  socket.on('msg',function(msg){
    console.log(msg)
  })

  socket.on('gameMessage',(msg)=>{
    raceHandler(msg,socket,io) 
  });

});

http.listen(3000, function(){
  console.log('listening on 3000');
});







