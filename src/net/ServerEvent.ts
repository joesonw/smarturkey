abstract class ServerEvent {
	private type:string;
	private payload:any;
	constructor(type:string,payload:any) {
		this.type = type;
		this.payload = payload;
	}	
	getType():string {
		return this.type;
	}
	getPayload():string {
		return this.payload;
	}
};
export default ServerEvent;