(function(){
	const port = 1337;
	const input = document.getElementById('port-input');
	const startBtn = document.getElementById('start');
	const stopBtn = document.getElementById('stop');
	const infoText = document.getElementById('info');

	window.onload = function setDefPort(){
		input.value = port;
	}

	const csInterface = new CSInterface();
	const require = (window.cep_node && window.cep_node.require) || window.require || function () {};
	const tcpServer = require(__dirname + '\\js\\server.js');




	csInterface.addEventListener("consoleLog", function(event){
  	tcpServer.write(event.data);
	});

	startBtn.addEventListener('click',function(){
		tcpServer.start(input.value);
		infoText.innerHTML = 'Server is on ...';
	});

	stopBtn.addEventListener('click',function(){
		tcpServer.stop();
		infoText.innerHTML = 'Server is off';
	});

})();