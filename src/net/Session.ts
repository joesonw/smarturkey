import ServerEvent from './ServerEvent';
import ServerMessage from './ServerMessage';
import ClientMessage from './ClientMessage';
import CallbackNotDefinedError from '../error/CallbackNotDefinedError';
import Connection from './Connection';
import Event from '../events/Event';

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
	send(e:Event) {
		console.log(e);
		this.connection.send(e);
	}
	getId():string {
		return this.id;
	}
	
}