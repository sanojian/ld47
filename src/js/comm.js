/*
socket.emit('message', "this is a test"); //sending to sender-client only
socket.broadcast.emit('message', "this is a test"); //sending to all clients except sender
socket.broadcast.to('game').emit('message', 'nice game'); //sending to all clients in 'game' room(channel) except sender
socket.to('game').emit('message', 'enjoy the game'); //sending to sender client, only if they are in 'game' room(channel)
socket.broadcast.to(socketid).emit('message', 'for your eyes only'); //sending to individual socketid
io.emit('message', "this is a test"); //sending to all clients, include sender
io.in('game').emit('message', 'cool game'); //sending to all clients in 'game' room(channel), include sender
io.of('myNamespace').emit('message', 'gg'); //sending to all clients in namespace 'myNamespace', include sender
socket.emit(); //send to all connected clients
socket.broadcast.emit(); //send to all connected clients except the one that sent the message
socket.on(); //event listener, can be called on client to execute on server
io.sockets.socket(); //for emiting to specific clients
io.sockets.emit(); //send to all connected clients (same as socket.emit)
io.sockets.on() ; //initial connection from a client.
*/

var myId = -1;
var gameSocket;

function initNetworking(callback) {
	//gameSocket = io.connect(CONFIG.matchServer);
	gameSocket = io.connect();

	gameSocket.on('connect', function () {
	  if (callback) {
			callback();
		}
	});


	gameSocket.on('reload', function(props) {
		location.href = location.href;
	});

  gameSocket.on('map', function(data) {
    for (var key in data) {
      g_game.tiles[key].tint = data[key];
    }
  });

  gameSocket.on('color', function(data) {
    g_game.tiles[data.id].tint = data.tint;
  });

	gameSocket.on('chat', function(data) {

		if (data.room != g_game.currentMap.name) {
			return;
		}

    var txt = g_game.chatTextGroup.getFirstDead();
    if (txt) {
			g_game.audio.chat.play();
      txt.text = data.message + ' ';
      txt.customProps.player = data.id;
      txt.reset();
      var timer = g_game.phaserGame.time.create();
      timer.add(Phaser.Timer.SECOND * 5, function() {
        txt.kill();
      }, this);
      timer.start();
    }
  });

	gameSocket.on('disconnect', function() {
		//clients[myId] = null;
	});


}
