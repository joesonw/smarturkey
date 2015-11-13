class Event {
	[key:string]: any;
	name: string;
	constructor(name:string) {
		this.name = name;
	}
};
export default Event;