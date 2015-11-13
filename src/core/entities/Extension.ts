
import EventListener from '../../events/EventListener';
import ClientEvent from '../../events/ClientEvent';
import Session from '../../net/Session';
import ExtensionManager from '../managers/ExtensionManager';

export default class Extension extends EventListener {
	protected id:string;
	protected extensionManager:ExtensionManager;

	constructor(extensionManager:ExtensionManager) {
		super();
		this.extensionManager = extensionManager;
	}
	setId(id:string):void {
		this.id = id;
	}
	getId():string {
		return this.id;
	}
	
}