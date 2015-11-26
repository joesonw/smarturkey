
import Extension from '../src/core/entities/Extension';
import User from '../src/core/entities/User';
import Room from '../src/core/entities/Room';
import Event from '../src/events/Event';
import CreateRoomSettings from '../src/core/api/CreateRoomSettings';

export default class MyExtension extends Extension {
	private defaultRoom:Room;
	init() {
		let settings:CreateRoomSettings = new CreateRoomSettings();
		settings.setName('test');
		this.defaultRoom = this.getApiManager().createRoom(settings);
	}
	
	handleRequest(user:User,request:string,params:{ [key:string]:any },room:Room) {
		console.log(request);
		let apiManager = this.getApiManager()
		if (request == 'client_join_zone') {
			console.log(user.getSession().getId() + ' joined zone');
		}
		let self = this;
		apiManager.addUser(user,this.defaultRoom);
		user.getSession().addEventListener('chat',(e:Event) => {
			let evt:Event = new Event('broadcast');
			evt['message'] = e['message'];
			let users:Array<User> = apiManager.getUsers(self.defaultRoom);
			console.log(users.length);
			for (let u of users) {
				u.getSession().send(evt);
			}
		});
	}
}