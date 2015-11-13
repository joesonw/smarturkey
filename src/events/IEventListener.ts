import Event from './Event';
interface IEventListener {
	addEventListener(event:string,callback:(e:Event) => void);
	dispatchEvent(event:Event);
	removeEventListener(event:string,callback:(e:Event) => void);
	hasEventListener(event:string):boolean;
}
export default IEventListener;