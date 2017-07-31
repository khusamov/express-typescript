
import * as _ from 'lodash';
import * as Express from 'express';

import RequestHandler from '../handler/RequestHandler';
import ErrorRequestHandler from '../handler/ErrorRequestHandler';
import AbstractRequestHandler from '../handler/AbstractRequestHandler';
import { default as PathParams, isPathParams } from '../handler/PathParams';

type ExpressRequestHandlerParams = Express.RequestHandler | Express.ErrorRequestHandler | (Express.RequestHandler | Express.ErrorRequestHandler)[];
type ExpressRequestHandlers = Express.RequestHandler[] | ExpressRequestHandlerParams[];

export type RequestHandlerParams = RequestHandler | ErrorRequestHandler | (RequestHandler | ErrorRequestHandler)[];
export type RequestHandlers = RequestHandler[] | RequestHandlerParams[];

export default class BaseRouter extends RequestHandler {
	
	protected _expressHandler: Express.Router;
	
	get expressHandler(): Express.Router {
		return this._expressHandler ? this._expressHandler : this._expressHandler = Express.Router();
	}
	
	constructor() {
		super();
		// Создаем экземпляр класса Express.Router.
		this.expressHandler; 
	}
	
	private getExpressHandlers(handlers: RequestHandlers): ExpressRequestHandlers {
		// BUG https://goo.gl/3EdrIF
		// Одно из решений проблемы https://toster.ru/q/419241
		return _.flatten(handlers).map(handler => handler.expressHandler);
	}
	
	protected registerHandlers(method: string, path: PathParams, handlers: RequestHandlers): this {
		
		return this;
	}
	
	use(...handlers: RequestHandler[]): this
	use(...handlers: RequestHandlerParams[]): this
	use(path: PathParams, ...handlers: RequestHandler[]): this
	use(path: PathParams, ...handlers: RequestHandlerParams[]): this
	use(...args: (PathParams | RequestHandler)[]): this
	use(...args: (PathParams | RequestHandlerParams)[]): this {
		let handlers: RequestHandlers = <RequestHandlers>(isPathParams(args[0]) ? args.slice(1) : args);
		let path: PathParams = isPathParams(args[0]) ? <PathParams>args[0] : null;
		this.emit('beforeUse', { path, _.flatten(handlers) });
		this.registerHandlers('use', path ? path : '/', handlers);
		if (path) {
			this._expressHandler.use(path, ...this.getExpressHandlers(handlers));
		} else {
			this._expressHandler.use(...this.getExpressHandlers(handlers));
		}
		this.emit('use', { path, _.flatten(handlers) });
		return this;
	}
	
	get(path: PathParams, ...handlers: RequestHandler[]): this
	get(path: PathParams, ...handlers: RequestHandlerParams[]): this {
		this.registerHandlers('get', path, handlers);
		this._expressHandler.get(path, ...this.getExpressHandlers(handlers));
		return this;
	}
	
	post(path: PathParams, ...handlers: RequestHandler[]): this
	post(path: PathParams, ...handlers: RequestHandlerParams[]): this {
		this.registerHandlers('post', path, handlers);
		this._expressHandler.post(path, ...this.getExpressHandlers(handlers));
		return this;
	}
	
	put(path: PathParams, ...handlers: RequestHandler[]): this
	put(path: PathParams, ...handlers: RequestHandlerParams[]): this {
		this.registerHandlers('put', path, handlers);
		this._expressHandler.put(path, ...this.getExpressHandlers(handlers));
		return this;
	}
	
	delete(path: PathParams, ...handlers: RequestHandler[]): this
	delete(path: PathParams, ...handlers: RequestHandlerParams[]): this {
		this.registerHandlers('delete', path, handlers);
		this._expressHandler.delete(path, ...this.getExpressHandlers(handlers));
		return this;
	}
	
}