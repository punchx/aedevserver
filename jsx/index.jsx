String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/gm,'');
}

function Console(event) {
	this.eventObj = event;
}

Console.prototype.log = function() {
	var args = arguments,
		str,
		i = 1;
	if (args.length > 1) {
		str = args[0].toString().replace(/%s/g, function(matches) {
			var arg;
			if (i >= args.length) {
				return matches;
			} else {
				arg = args[i++]			
				return  (arg == undefined) ? 'undefind' : arg;
			}
		});
		for (;i < args.length; i++) {
			str += ' ' + args[i] 
		}
	} else if (args.length == 1) {
		str = args[0] == undefined ? 'undefind' : args[0].toString()
	} else { 
		return true;
	}
	
	this.eventObj.data = str.trim();
	this.eventObj.dispatch();
	var bt = new BridgeTalk;
	var targetApp = BridgeTalk.getSpecifier("estoolkit");
	if(BridgeTalk.isRunning("estoolkit")) {		
		bt.target = targetApp;
		bt.body = "print('" + str + "')";
		bt.send ();
	}
}

Console.prototype.error = function() {
	if(arguments.length == 0) return true;
	var str = arguments[0] == undefined ? 'undefined' : arguments[0];
	var args = [],
			errStr = $.fileName + ' [line: ' + $.line + '] Error: "' + str;
			args.push(errStr);
	for (var i=1; i < arguments.length; i++) {
		args.push(arguments[i]);
	}
	args[args.length-1] = args[args.length-1] + '"';
	this.log.apply(this, args);
}

var externalObjectName = "PlugPlugExternalObject"; 
var mylib = new ExternalObject( "lib:" + externalObjectName );

function execScript(path) {
	var eventObj = new CSXSEvent(); 
	eventObj.type='consoleLog'; 

	var console = new Console(eventObj);

	try {
				
		$.evalFile(path.trim());

	} catch(err) {
		console.log(err.fileName + ' [line: ' + err.line + '] ' + err.name + ': "' + err.message + '"');
	}
	console.log('###End###');
}