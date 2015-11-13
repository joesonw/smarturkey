import Collection from '../../util/Collection';
import Room from './Room';
import Extension from './Extension';
import User from './User';
import IIdGenerator from '../../util/IIdGenerator';
import DefaultIdGenerator from '../../util/DefaultIdGenerator';
import {findIndexOf,findIndex} from '../../util/Utilities';


import EventListener from '../../events/EventListener';
import ClientEvent from '../../events/ClientEvent';
import Session from '../../net/Session';

const Dictionary = Collection.Dictionary;


export default class Zone extends EventListener{

	private id:string;
	private active:boolean = false;
	private rooms:Array<Room> = new Array<Room>();
	private extensions:Array<Extension> = new Array<Extension>();
	private users:Array<User> = new Array<User>();

	private roomIdGenerator:IIdGenerator = new DefaultIdGenerator();
	private extensionIdGenerator:IIdGenerator = new DefaultIdGenerator();

	constructor(id:string) {
		super();
		this.id = id;
	}
	
	private handleJoinZone(e:ClientEvent) {
		let session:Session = e['session'];
		let user:User = new User(session);
		this.users.push(user);
		session.addEventListener(ClientEvent.DISCONNECT,this.handleDiscconect.bind(this,session));
	}
	
	private handleDiscconect(session:Session,e:ClientEvent) {
		let index = findIndex(this.users, session, (u:User) => u.getSession());
		if (index > -1)
			this.users.splice(index,1);
	}
	
	init() {
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

	addRoom(room:Room):void {
		//room.setId(this.roomIdGenerator.generate(room));
		this.rooms.push(room);
	}
	removeRoom(room:Room | string):void {
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
	setRoomIdGenerator(generator:IIdGenerator):void {
		this.roomIdGenerator = generator;
	}
	addExtension(extension:Extension):void {
		//extension.setId(this.roomIdGenerator.generate(extension));
		this.extensions.push(extension);
	}
	removeExtension(extension: Extension | string):void {
		let index = -1;
		if (typeof extension == 'string') {
			index = findIndex(this.extensions,extension,(e:Extension) => e.getId());
		} else if (extension instanceof Extension) {
			index = findIndexOf(this.extensions,extension);
		}
		if (index !== -1) {
			this.extensions.splice(index,1);
		}
	}
	setExtensionIdGenerator(generator:IIdGenerator):void {
		this.extensionIdGenerator = generator;
	}
	addUser(user:User):void {
		this.users.push(user);
	}
	removeUser(user: User | string):void {
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