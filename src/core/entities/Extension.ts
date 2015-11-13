
import EventListener from '../../events/EventListener';
import ClientEvent from '../../events/ClientEvent';
import Session from '../../net/Session';

export default class Extension extends EventListener {
	private id:string;

	constructor() {
		super();
		this.addEventListener(ClientEvent.JOIN_ZONE,(e:ClientEvent) => {
			let session:Session = e['session'];
			
		});
	}
	setId(id:string):void {
		this.id = id;
	}
	getId():string {
		return this.id;
	}
	
}