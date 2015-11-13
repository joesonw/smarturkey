var Server = require('../core/server');
var WebSocketServer = require('../net/websocket');

var server = new Server({
	port: 3001
});

server.setNetServer(new WebSocketServer());
server.run();
