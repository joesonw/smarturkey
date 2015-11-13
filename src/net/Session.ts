import ServerEvent from './ServerEvent';
import ServerMessage from './ServerMessage';
import ClientMessage from './ClientMessage';
import CallbackNotDefinedError from '../error/CallbackNotDefinedError';
import Connection from './Connection';

import EventListener from '../events/EventListener';

export default class Session extends EventListener{
	private connection:Connection;
	private id:string;
	constructor(id:string,connection:Connection) {
		super();
		this.id = id;
		this.connection = connection;
		let self = this;
	}
	send(e:ServerEvent) {
		this.connection.send({event:e.getType(),payload:e.getPayload()});
	}
	getId():string {
		return this.id;
	}
	
}