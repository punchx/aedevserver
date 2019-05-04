(function(){
	var port = 1337;
	var input = document.getElementById('port-input');
	var startBtn = document.getElementById('start');
	var stopBtn = document.getElementById('stop');
	var infoText = document.getElementById('info');

	window.onload = function setDefPort(){
		input.value = port;
	}

	var csInterface = new CSInterface();
	var require = (window.cep_node && window.cep_node.require) || window.require || function () {};
	var path = require('path');
	try {
		if (process.platform == 'darwin') {
			var prevNap = require(__dirname + path.normalize('/js/libs/PrevNap'));
		}
	} catch(err){
		infoText.innerHTML = err.message;
	}

	try {
		var tcpServer = require(__dirname + path.normalize('/js/server.js'));
	} catch(err){
		infoText.innerHTML = err.message;
	}


	csInterface.addEventListener("consoleLog", function(event){
  		tcpServer.write(event.data);
	});

	startBtn.addEventListener('click',function(){
		tcpServer.start(input.value);
		if (process.platform == 'darwin') {
			prevNap.Disable();
		}
		infoText.innerHTML = 'Server is on ...';
	});

	stopBtn.addEventListener('click',function(){
		tcpServer.stop();
		infoText.innerHTML = 'Server is off';
	});

})();