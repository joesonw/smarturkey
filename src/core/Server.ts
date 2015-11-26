import ApiManager from './api/ApiManager';
import INetServer from '../net/INetServer';
import Session from '../net/Session';
import User from './entities/User';
import Logger from '../util/Logger';
import Zone from './entities/Zone';
import ClientMessage from '../net/ClientMessage';
import EventListener from '../events/EventListener';

import Event from '../events/Event';
import ClientEvent from '../events/ClientEvent';
import {findIndexOf, findIndex, removeElementOf} from '../util/Utilities';

import ExtensionManager from './managers/ExtensionManager';

export default class Server extends EventListener{
	private apiManager: ApiManager;
	private server: INetServer;
	private users:Array<User> = new Array<User>();
	private zones:Array<Zone> = new Array<Zone>();
	private extensionManager:ExtensionManager;
	
	constructor() {
		super();
		this.extensionManager = ExtensionManager.getInstance();
	}
	protected getApiManager():ApiManager {
		return this.apiManager;
	}
	protected getExtensionManager():ExtensionManager {
		return this.extensionManager;
	}
	protected startServer(server:INetServer) {
		this.server = server;
		let self = this;
		
		server.addEventListener(ClientEvent.CONNECT, (e:Event) => {
			let session:Session = e['session'];
			let user = new User(session);
			Logger.info('Client with id ' + session.getId() + ' conntected');
			let clientEvent:ClientEvent = new ClientEvent(ClientEvent.CONNECT,user);
			self.dispatchEvent(clientEvent);
			self.eventRegister(user);
			self.users.push(user);
		});
		server.start();
	}
	protected eventRegister(user:User) {
		let self = this;
		user.getSession().addEventListener(ClientEvent.JOIN_ZONE,(e:ClientEvent) => {
			let zoneId = e['zone'] || '';
			let index = findIndex(this.zones,zoneId,(z:Zone) => z.getId());
			let zone:Zone = this.zones[index];
			if (zone) {
				let e:ClientEvent = new ClientEvent(ClientEvent.JOIN_ZONE,user);
				zone.dispatchEvent(e);
			}
		});
		user.getSession().addEventListener(ClientEvent.DISCONNECT,(e:Event) => {
			removeElementOf(self.users,user);
			self.dispatchEvent(e);
		});
	}
	
	protected addZone(zone:Zone) {
		this.zones.push(zone);
	}
}