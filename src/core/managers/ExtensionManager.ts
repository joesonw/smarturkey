import Manager from './Manager';
import Extension from '../entities/Extension';
import {removeElementOf, removeElement, findElement} from '../../util/Utilities';
import Event from '../../events/Event';

export default class ExtensionManager extends Manager {
	private extensions:Array<Extension> = new Array<Extension>();
	private static instance:ExtensionManager;
	
	static getInstance():ExtensionManager {
		if (!this.instance) {
			this.instance = new ExtensionManager()
		}
		return this.instance;
	}
	
	constructor() {
		super();
	}
	addExtension(e:Extension) {
		this.extensions.push(e);
	}
	removeExtension(extension:Extension | string) {
		if (typeof extension == 'string') {
			removeElement(this.extensions,extension,(e:Extension) => e.getId());
		} else if (extension instanceof Extension) {
			removeElementOf(this.extensions,extension);
		}
	}
	dispatchEventToExtension(event:Event,eArg:Extension | string) {
		let extension:Extension;
		if (typeof eArg == 'string') {
			extension = findElement(this.extensions,eArg,(e:Extension) => e.getId());
		} else {
			extension = eArg as Extension;
		}
		extension.dispatchEvent(event);
	}
	getExtension(id:string) {
		return findElement(this.extensions,id,(e:Extension) => e.getId());
	}
}