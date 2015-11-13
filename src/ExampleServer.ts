import Server from './core/Server';
import WebSocketNetServer from './net/WebSocketNetServer';
import Logger from './util/Logger';
import Event from './events/Event';
import ClientEvent from './events/ClientEvent';
import Session from './net/session';

/// <reference path="../../typings/winston/winston.d.ts" />
import winston = require('winston');


class ExampleServer extends Server {
	constructor() {
		super();
		this.startServer(new WebSocketNetServer(3001));
		Logger.info('Server started on port 3001');
		this.addEventListener(ClientEvent.CONNECT,(e:ClientEvent) => {
			let session:Session = e['session'];
		});
		this.addEventListener('message',(e:Event) => {
			console.log(e);
		});
	}
}
winston.level = 'debug';
Logger.add(winston.transports.Console);
var server:ExampleServer = new ExampleServer();