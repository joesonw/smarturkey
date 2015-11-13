import ServerError from './ServerError';

export default class ReservedNameError extends ServerError {
	constructor(name:string,description?:string) {
		description = description || '${name} is a reserved name/key.'
		super('${name} is reserved',description);
	}
}