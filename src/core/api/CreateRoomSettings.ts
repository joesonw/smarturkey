import Zone from '../entities/Zone';
export default class CreateRoomSettings {
	private name:string;
	constructor() {}
	setName(name:string):CreateRoomSettings {
		this.name = name;
		return this;
	}
	getName():string {
		return this.name;
	}
}