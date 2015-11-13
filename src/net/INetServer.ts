import ServerEvent from './ServerEvent';
import Session from './Session';
import IEventListener from '../events/IEventListener';

interface INetServer extends IEventListener{
	broadcastEvent(e:ServerEvent):void;
	registerConnectionCallback(callback:(session:Session) => void):void;
	start():void;
}
export default INetServer;