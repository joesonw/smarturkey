
import ClientMessage from './ClientMessage';
import ServerMessage from './ServerMessage';

interface Connection {
	send(message:ServerMessage):void;
	ip:string;
	disconnect();
}
export default Connection;