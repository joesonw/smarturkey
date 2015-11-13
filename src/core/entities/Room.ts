export default class Room {
	private id:string;
	constructor() {
	}
	getId():string {
		return this.id;
	}
	setId(id:string):void {
		this.id = id;
	}
}