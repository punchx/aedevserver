function execScript(path) {
	function Console(event) {
		this.eventObj = event;
	}

	Console.prototype.log = function(str) {
		// var endl = (str[str.length-1] == '\r\n') ? '' : '\r\n';
		this.eventObj.data = str;
		this.eventObj.dispatch();
	}

	var externalObjectName = "PlugPlugExternalObject"; 
	var mylib = new ExternalObject( "lib:" + externalObjectName );

	var eventObj = new CSXSEvent(); 
	eventObj.type='consoleLog'; 

	var console = new Console(eventObj);


	console.log('log 1\nlogggneline');
	try {
		console.log('log 2');
		$.evalFile(path);
		console.log('log 3');
	} catch(err) {
		console.log('Error at line [ ' + (err.line) + ' ]: "' + err.message + '"');
	}
	console.log('###End###');
}