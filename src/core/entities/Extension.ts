
import EventListener from '../../events/EventListener';
import ClientEvent from '../../events/ClientEvent';
import Session from '../../net/Session';
import ExtensionManager from '../managers/ExtensionManager';
import User from './User';
import Room from './Room';
import ApiManager from '../api/ApiManager';

/*
 Stateless controller for rooms. Requestes are initialized by its zone.
*/
abstract class Extension extends EventListener {
	protected id:string;
	private apiManager:ApiManager;

	constructor() {
		super();
	}
	abstract init();
	setApiManager(apiManager:ApiManager) {
		this.apiManager = apiManager;
	}
	protected getApiManager():ApiManager {
		return this.apiManager;
	}
	setId(id:string):void {
		this.id = id;
	}
	getId():string {
		return this.id;
	}
	abstract handleRequest(user:User,request:string,parms:{ [key:string]:any },room:Room);
	
}
export default Extension;