import INetServer from './INetServer';
import ServerEvent from './ServerEvent';
import Session from './Session';
import ClientMessage from './ClientMessage';
import ServerMessage from './ServerMessage';
import Connection from './Connection';

/// <reference path="../../typings/socket.io/socket.io.d.ts" />
/// <reference path="../../typings/node/node.d.ts" />
import events = require('events');
import Event from '../events/Event';
import ClientEvent from '../events/ClientEvent';
import io = require('socket.io');
export default class WebSocketNetServer implements INetServer {
	private server:SocketIO.Server;
	private port;
	
	private connectionCallback: (session:Session) => void;

	private emitter:events.EventEmitter;
	
	constructor(port:number) {
		this.emitter = new events.EventEmitter();
		this.server = io();
		this.port = port;
	}
	
	addEventListener(event:string,callback:(e:Event) => void) {
		this.emitter.on(event,callback);
	}
	dispatchEvent(event:Event) {
		this.emitter.emit(event.name,event);
	}
	removeEventListener(event:string,callback:(e:Event) => void) {
		this.emitter.removeListener(event,callback)
	}
	hasEventListener(event:string):boolean {
		return this.emitter.listeners(event).length > 0;
	}
	
	broadcastEvent(e:ServerEvent) {}
	
	registerConnectionCallback(callback:(session:Session) => void):void {
		this.connectionCallback = callback;
	}
	start() {
		this.server.listen(this.port);
		this.server.on('connection',this.handler.bind(this));
	}
	private handler(socket:SocketIO.Socket) {
		let self = this;
		let connection:Connection = {
			send: (event:Event) => {
				let payload = {};
				for (let key in event) {
					if (key == 'name') {
						continue;
					}
					payload[key] = event[key]
				}
				socket.emit('message',{
					event: event.name,
					payload: payload
				});
			},
			ip: socket.conn.remoteAddress,
			disconnect: () => {
				socket.disconnect(true);
			}
		};
		let session = new Session(socket.id,connection);
		
		socket.on('message', (message) => {
			if (message.event && (typeof message.event == 'string')) {
				let e:Event = new Event(message.event);
				for (let key in (message.payload || {})) {
					e[key] = message.payload[key];
				}
				session.dispatchEvent(e);
			}
		});
		socket.on('disconnect', () => {
			session.dispatchEvent(new Event(ClientEvent.DISCONNECT));
		});
		let e = new Event(ClientEvent.CONNECT);
		e['session'] = session;
		this.dispatchEvent(e);
	}
}