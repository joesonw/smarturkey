import Event from './Event';

export default class ClientEvent extends Event {
	static CONNECT:string = 'client_connect';
	static DISCONNECT:string = 'client_disconnect';
	static JOIN_ZONE:string = 'client_join_zone';
	constructor(type:string) {
		super(type);
	}
}