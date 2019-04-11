const net = require('net');
const port = 1337;
const host = '127.0.0.1';
var csInterface = new CSInterface();


var tcpServer = {start, stop, write};

function start() {
	this.server = net.createServer();
	var self = this;

	this.server.on('connection', function(socket) {
	  socket.on('data', function(data) {
	  	csInterface.evalScript('execScript("' + data +'");');
	  });

	  self.socket = socket;
	});

	this.server.on('error', function(err) {
		console.log(err);
	});

	this.server.listen(port, host, function() {
		console.log('server listen port %s', port);
	});
}

function stop() {
	var self = this;

	for(var key in this.sockets) {
		this.sockets[key].destroy();
	}
	this.server.close(function() {
		self.server.unref();
	});

}

function write(str) {
		this.socket.write(str + '\0');
}

module.exports = tcpServer;
