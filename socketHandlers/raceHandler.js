



module.exports =
  function (){
    let store = {}
     
    return function(msg,socket,io){  
      let msgObject = JSON.parse(msg)
      console.log(msgObject)
      let {player,type,body,room} = msgObject
      console.log(player,type,body,room)
      
      //If first msg recieved from store initialize
      if(!store.hasOwnProperty(room)){store[room]={}}
      //If first msg recieved initialize player object in store
      if(!store[room].hasOwnProperty(player)){store[room][player]={string:''}}
      
      let ourStore = store[room];
      console.log(store)
      
      switch(type){
      case 'stringChange':
        ourStore[player].string = body
        io.in(`${room}`).emit('game',JSON.stringify(store));
      }

      console.log('store:', store)
    }

  }
  
