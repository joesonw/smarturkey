import ServerError from './ServerError';

export default class UninitializedError extends ServerError {
	constructor(name:string,description?:string) {
		description = description || '${name} is uninitialized';
		super('${name} is uninitialized',description);
	}
}