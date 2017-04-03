
import * as Express from 'express';
import HttpMiddleware from './middleware/HttpMiddleware';
import ErrorController from './controller/ErrorController';
import PageNotFoundController from './controller/PageNotFoundController';

export default class Application extends HttpMiddleware {
	
	private _app: Express.Application;
	
	constructor() {
		super();
		this._app = Express();
		this.init();
		this.use(new PageNotFoundController);
        this.use(new ErrorController);
	}
	
	protected init() {}
	
	get middleware(): Express.Application {
		return this._app;
	}
	
	get(...args: any[]) {
		if (arguments.length == 1) {
			return this._app.get.apply(this, args);
		}
		return super.get.apply(this, args);
	}
	
	set(...args: any[]) {
		return this._app.set.apply(arguments);
	}
	
	listen(...args: any[]) {
		return this._app.listen.apply(this._app, arguments);
	}
	
}