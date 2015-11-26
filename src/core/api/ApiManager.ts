import CreateRoomSettings from './CreateRoomSettings';
import Room from '../entities/Room';
import Zone from '../entities/Zone';
import User from '../entities/User';

export default class ApiManager {
	private zone:Zone;
	constructor(zone:Zone) {
		this.zone = zone;
	}
	createRoom(settings:CreateRoomSettings):Room {
		let room = new Room();
		this.zone.addRoom(room);
		return room;
	}
	addUser(user:User,room:Room) {
		room.addUser(user);
	}
	getUsers(room?:Room):Array<User> {
		if (room) {
			return room.getUsers();
		}
		return this.zone.getUsers();
	}
}