import IIdGenerator from './IIdGenerator';

export default class DefaultIdGenerator implements IIdGenerator {
	private counter:number = 0;
	constructor() {}
	generate():string {
		return (this.counter++).toString();
	}	
}