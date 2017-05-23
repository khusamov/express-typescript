
import * as Express from 'express';

import Router from './Router';
import ErrorController from './controller/ErrorController';
import NotFoundController from './controller/NotFoundController';
import NotImplementedRouterPlugin from './handler/plugin/NotImplementedRouterPlugin';

export default class Application extends Router {
	
	
	protected _expressHandler: Express.Application;
	
	
    get expressHandler(): Express.Application {
        return this._expressHandler ? this._expressHandler : this._expressHandler = Express();
    }
	
	
	
	constructor() {
		super();
		
		this.registerPlugin(new NotImplementedRouterPlugin);
		
		//this.set('x-powered-by', false); // Эту строку раскомментировать, когда будет создан метод set в классе роутера.
		
		
		this.use(new NotFoundController);
		this.use(new ErrorController);
	}
	
	
	
	// get(...args: any[]) {
	// 	if (arguments.length == 1) {
	// 		this._app.get.apply(this, args);
	// 		return this;
	// 	}
	// 	return super.get.apply(this, args);
	// }
	
	// set(...args: any[]) {
	// 	return this._app.set.apply(arguments);
	// }
	
	// listen(...args: any[]) {
	// 	return this._app.listen.apply(this._app, arguments);
	// }
	
}