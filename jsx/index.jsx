function execScript(path) {
	function Console(event) {
		this.eventObj = event;
	}


	Console.prototype.log = function(str) {
		// var endl = (str[str.length-1] == '\r\n') ? '' : '\r\n';
		this.eventObj.data = str.toString();
		this.eventObj.dispatch();
	}

	var externalObjectName = "PlugPlugExternalObject"; 
	var mylib = new ExternalObject( "lib:" + externalObjectName );

	var eventObj = new CSXSEvent(); 
	eventObj.type='consoleLog'; 

	var console = new Console(eventObj);

	try {
		$.evalFile(path);
	} catch(err) {
		console.log('Error at line [ ' + (err.line) + ' ]: "' + err.message + '"');
	}
	console.log('###End###');
}