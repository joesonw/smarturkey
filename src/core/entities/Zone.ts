import Collection from '../../util/Collection';
import Room from './Room';
import Extension from './Extension';
import User from './User';
import IIdGenerator from '../../util/IIdGenerator';
import DefaultIdGenerator from '../../util/DefaultIdGenerator';
import {findIndexOf,findIndex,removeElementOf} from '../../util/Utilities';

import UninitializedError from '../../error/UninitializedError';
import EventListener from '../../events/EventListener';
import ClientEvent from '../../events/ClientEvent';
import Session from '../../net/Session';
import ApiManager from '../api/ApiManager';

const Dictionary = Collection.Dictionary;

/*
 Stateful container for rooms, parse event into request and pass to binded extension
*/
export default class Zone extends EventListener{

	private id:string;
	private active:boolean = false;
	private rooms:Array<Room> = new Array<Room>();
	private extension:Extension;
	private users:Array<User> = new Array<User>();

	private roomIdGenerator:IIdGenerator = new DefaultIdGenerator();
	private extensionIdGenerator:IIdGenerator = new DefaultIdGenerator();

	constructor(id:string) {
		super();
		this.id = id;
	}
	
	private handleJoinZone(e:ClientEvent) {
		let user:User = e.getUser();
		this.users.push(user);
		user.getSession().addEventListener(ClientEvent.DISCONNECT,this.handleDiscconect.bind(this,user));
		this.extension.handleRequest(user,ClientEvent.JOIN_ZONE,{},null);
	}
	
	private handleDiscconect(user:User,e:ClientEvent) {
		removeElementOf(this.users,user);
	}
	
	init() {
		if (!this.extension) {
			throw new UninitializedError('extension');
		}
		this.addEventListener(ClientEvent.JOIN_ZONE,this.handleJoinZone.bind(this));
	}
	destroy() {
		this.removeEventListener(ClientEvent.JOIN_ZONE,this.handleJoinZone.bind(this));
	}
	
	setActive(flag:boolean) {
		if (this.active && !flag) {
			this.destroy();
		} else if (!this.active && flag) {
			this.init();
		}	
		this.active = flag;
	}
	isActive():boolean {
		return this.active;
	}

	addRoom(room:Room) {
		//room.setId(this.roomIdGenerator.generate(room));
		this.rooms.push(room);
	}
	removeRoom(room:Room | string) {
		let index = -1;
		if (typeof room == 'string') {
			index = findIndex(this.rooms,room,(r:Room) => r.getId());
		} else if (room instanceof Room) {
			index = findIndexOf(this.rooms,room);
		}
		if (index !== -1) {
			this.rooms.splice(index,1);
		}
	}
	setRoomIdGenerator(generator:IIdGenerator) {
		this.roomIdGenerator = generator;
	}
	setExtension(extension:Extension) {
		this.extension = extension;
		extension.setApiManager(new ApiManager(this));
		extension.init();
	}
	getExtension():Extension {
		return this.extension;
	}
	addUser(user:User) {
		this.users.push(user);
	}
	getUsers():Array<User> {
		return this.users;
	}
	removeUser(user: User | string) {
		let index = -1;
		if(typeof user == 'string') {
			index = findIndex(this.users,user,(u:User) => u.getId());
		} else if (user instanceof User) {
			index = findIndexOf(this.users,user);
		}
		if (index !== -1) {
			this.users.splice(index,1);
		}
	}
	getId():string {
		return this.id;
	}
}