var net = require('net');


let buffered = '';

var client = new net.Socket();
client.connect(1337, '127.0.0.1', function() {
	client.write('D:\\\\jsx\\\\hello.jsx');
});

client.on('data', function(data) {
	// console.log(data.toString());
	buffered += data;
	msgSplit();
});

client.on('error', function(err) {
	console.log(err);
});

client.on('close', function() {
});

function msgSplit() {
	var rec = buffered.split('\0');

	while(rec.length > 1) {
		if(rec[0] == '###End###') {
			client.destroy();
			return true;
		}
		console.log(rec[0]);
		buffered = rec.slice(1).join('\0');
		rec = buffered.split('\0');
	}
}