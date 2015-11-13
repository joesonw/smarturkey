abstract class ServerError {
	private description:string;
	private message:string;
	constructor(message:string,description:string) {
		this.message = message;
		this.description = description;
	}
	getMessage():string {
		return this.message;
	}
	getDescription():string {
		return this.description;
	}
}
export default ServerError;