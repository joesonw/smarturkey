import Zone from '../entities/Zone';
export default class CreateRoomSettings {
	private zone:Zone;
	constructor() {}
	
	setZone(zone:Zone):CreateRoomSettings {
		this.zone = zone;
		return this;
	}
	getZone():Zone {
		return this.zone;
	}
	
	
}