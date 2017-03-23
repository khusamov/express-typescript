
import * as Express from 'express';

export class Application {
	
	private _app: Express.Application;
	
	constructor() {
		this._app = Express();
	}
	
	get(...args: any[]) {
		return this._app.get.apply(this._app, arguments);
	}
	
	listen(...args: any[]) {
		return this._app.listen.apply(this._app, arguments);
	}
	
}