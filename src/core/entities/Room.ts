import User from './User';
import {removeElementOf} from '../../util/Utilities';
export default class Room {
	private id:string;
	private users:Array<User> = new Array<User>();
	constructor() {}
	getId():string {
		return this.id;
	}
	setId(id:string):void {
		this.id = id;
	}
	addUser(user:User) {
		this.users.push(user);
	}
	getUsers():Array<User> {
		return this.users;
	}
	removeUser(user:User) {
		removeElementOf(this.users,user);
	}	
}