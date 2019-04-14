var net = require('net'),
		host = '127.0.0.1',
		csInterface = new CSInterface(),
		tcpServer = {start, stop, write};
		
module.exports = tcpServer;

function start(port) {
	this.server = net.createServer();

	this.server.on('connection', (socket)=>{
	  socket.on('data', (data) => {
	  	csInterface.evalScript(`execScript(' ${data} ');`);
	  });

	  this.socket = socket;
	});

	this.server.on('error', (err) => {
		console.log(err);
	});

	this.server.listen(port, host, () => {
		console.log('server listen port %s', port);
	});
}

function stop() {
	for(var key in this.sockets) {
		this.sockets[key].destroy();
	}
	this.server.close(() => {
		this.server.unref();
	});

}

function write(str) {
		this.socket.write(str + '\0');
}

