import ServerError from './ServerError';

export default class CallbackNotDefinedError extends ServerError {
	constructor(name:string,Class:string,method:string) {
		super('Callback ${name} is not defined','In ${Class}.${method}, a callback is called but not defined.');
	}
}