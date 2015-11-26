
import ClientMessage from './ClientMessage';
import ServerMessage from './ServerMessage';
import Event from '../events/Event';

interface Connection {
	send(event:Event):void;
	ip:string;
	disconnect();
}
export default Connection;