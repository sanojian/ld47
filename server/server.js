
var express = require('express');
var config = require('./config');
var http = require('http');
var path = require('path');

var app = module.exports = express();

app.set('port', config.express.port);

app.use(express.static(path.join(__dirname, '../dist')));

var theApp = http.createServer(app);
theApp.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

// socket.io
var io = require('socket.io')(theApp);

var nextClientId = 0;
var mapData = {};

io.on('connection', function(socket) {

  var myId;

  socket.join();

  socket.emit('map', mapData);
  
	socket.on('chat', function (data) {
    io.emit('chat', data );
  });

  socket.on('color', function (data) {

    mapData[data.id] = data.tint;

    io.emit('color', data );
  });


	socket.on('disconnect', function() {

	});

  socket.on('adminPlayerList', function() {

    var clientArray = [];
    for (var key in clients) {
      clientArray.push({ props: getAdminProps(clients[key]) });
    }
    socket.emit('adminPlayerList', { clients: clientArray });
  });

});
