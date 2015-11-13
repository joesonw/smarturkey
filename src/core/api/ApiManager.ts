import CreateRoomSettings from './CreateRoomSettings';
import Room from '../entities/Room';
export default class ApiManager {
	constructor() {
		
	}
	createRoom(settings:CreateRoomSettings):Room {
		let room = new Room();
		settings.getZone().addRoom(room);
		return room;
	}
}