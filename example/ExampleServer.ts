import Server from '../src/core/Server';
import WebSocketNetServer from '../src/net/WebSocketNetServer';
import Logger from '../src/util/Logger';
import Event from '../src/events/Event';
import ClientEvent from '../src/events/ClientEvent';
import Session from '../src/net/session';
import Zone from '../src/core/entities/Zone';
import MyExtension from './MyExtension';

/// <reference path="../typings/winston/winston.d.ts" />
import winston = require('winston');


class ExampleServer extends Server {
	constructor() {
		super();
		this.startServer(new WebSocketNetServer(3001));
		Logger.info('Server started on port 3001');
		this.addEventListener(ClientEvent.CONNECT,(e:ClientEvent) => {
			let session:Session = e.getUser().getSession();
			console.log('yes ' + session.getId());
		});
		let zone1:Zone = new Zone('1');
		let zone1Extension:MyExtension = new MyExtension();
		zone1.setExtension(zone1Extension);
		zone1.setActive(true);
		this.addZone(zone1);
	}
}
winston.level = 'debug';
Logger.add(winston.transports.Console);
var server:ExampleServer = new ExampleServer();