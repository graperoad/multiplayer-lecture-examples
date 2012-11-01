var io = require('socket.io').listen(80);

//game data
var players = [];

//setup stuff
setInterval(gameLoop, 1000);


//game stuff
function gameLoop() {
	io.sockets.emit("news", { a: "lol"})
}

//socket stuff
io.sockets.on('connection', onSocketConnect);

function onSocketConnect(client) {
	client.on("disconnect", onClientDisconnect);
	client.on("new player", onNewPlayer);
}

function onClientDisconnect(client) {

}

function onNewPlayer(data) {
	
	//new player object
	var newPlayer = { name: data.name };
	players.push(newPlayer);

	//Send to all players that there is a new player and his info
	this.broadcast.emit("new player", newPlayer);

	//go through all the current players and send them to the new
	var i, existingPlayer;
	for (i = 0; i < players.length; i++) {
	    existingPlayer = players[i];
	    this.emit("new player", existingPlayer);
	};

	
}

/*
io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });

  socket.on('my other event', function (data) {
    console.log(data);
  });

});
*/