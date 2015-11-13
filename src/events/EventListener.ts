/// <reference path="../../typings/node/node.d.ts" />
import events = require('events');
import Event from './Event';
export default class EventListener {
	private emitter:events.EventEmitter;
	constructor() {
		this.emitter = new events.EventEmitter();
	}
	addEventListener(event:string,callback:(e:Event) => void) {
		this.emitter.on(event,callback);
	}
	dispatchEvent(event:Event) {
		this.emitter.emit(event.name,event);
	}
	removeEventListener(event:string,callback:(e:Event) => void) {
		this.emitter.removeListener(event,callback)
	}
	hasEventListener(event:string):boolean {
		return this.emitter.listeners(event).length > 0;
	}
}
