(function(){

	var csInterface = new CSInterface();
	var require = (window.cep_node && window.cep_node.require) || window.require || function () {};
	var tcpServer = require(__dirname + '\\js\\server.js');

	const startBtn = document.getElementById('start');
	const stopBtn = document.getElementById('stop');
	const infoText = document.getElementById('info');

	csInterface.addEventListener("consoleLog", function(event){
  	tcpServer.write(event.data);
	});

	startBtn.addEventListener('click',function(){
		tcpServer.start();
		infoText.innerHTML = 'server start';
	});

	stopBtn.addEventListener('click',function(){
		tcpServer.stop();
		infoText.innerHTML = 'server closed';
	});

})();