import ApiManager from './api/ApiManager';
import INetServer from '../net/INetServer';
import Session from '../net/Session';
import Logger from '../util/Logger';
import Zone from './entities/Zone';
import ClientMessage from '../net/ClientMessage';
import EventListener from '../events/EventListener';

import Event from '../events/Event';
import ClientEvent from '../events/ClientEvent';
import {findIndexOf,findIndex} from '../util/Utilities';

export default class Server extends EventListener{
	private apiManager: ApiManager;
	private server: INetServer;
	private sessions:Array<Session> = new Array<Session>();
	private zones:Array<Zone> = new Array<Zone>();
	
	constructor() {
		super();
		this.apiManager = new ApiManager();
	}
	protected getApiManager():ApiManager {
		return this.apiManager;
	}
	protected startServer(server:INetServer) {
		this.server = server;
		let self = this;
		
		server.addEventListener(ClientEvent.CONNECT, (e:ClientEvent) => {
			let session:Session = e['session'];
			Logger.info('Client with id ' + session.getId() + ' conntected');
			self.sessions.push(session);
			self.dispatchEvent(e);
			self.eventRegister(session);
		});
		server.start();
	}
	protected eventRegister(session:Session) {
		let self = this;
		session.addEventListener(ClientEvent.JOIN_ZONE,(e:ClientEvent) {
			let zoneName = e['zone'] || '';
			let index = findIndex(this.zones,zoneName,(z:Zone) => z.getName());
			let zone:Zone = this.zones[index];
			if (zone) {
				let e = new ClientEvent(ClientEvent.JOIN_ZONE);
				e['session'] = session;
				e['zone'] = zone;
				zone.dispatchEvent(e);
			}
		});
		
	}
	
	protected addZone(zone:Zone) {
		this.zones.push(zone);
	}
}