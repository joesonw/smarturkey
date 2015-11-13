import Event from './Event';
import User from '../core/entities/User';

export default class ClientEvent extends Event {
	static CONNECT:string = 'client_connect';
	static DISCONNECT:string = 'client_disconnect';
	static JOIN_ZONE:string = 'client_join_zone';
	private user:User;
	constructor(type:string,user:User) {
		super(type);
		this.user = user;
	}
	getUser():User {
		return this.user;
	}
}