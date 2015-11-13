import Session from '../../net/Session';
export default class User {
	private id:string;
	private session:Session;
	constructor(session:Session) {
		this.session = session;
	}
	getSession():Session {
		return this.session;
	}
	getId():string {
		return this.id;
	}
	
}