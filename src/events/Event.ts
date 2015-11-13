import ReservedNameError from '../error/ReservedNameError';
export default class Event {
	[key:string]: any;
	name: string;
	constructor(name:string) {
		if (name == 'message') {
			throw new ReservedNameError('message','message is a reserved event type/name.');
		}
		this.name = name;
	}
}