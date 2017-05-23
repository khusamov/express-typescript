
import * as _ from 'lodash';
import * as Express from 'express';
import RequestHandler from './handler/RequestHandler';
import ErrorRequestHandler from './handler/ErrorRequestHandler';

export type PathParams = string | RegExp | (string | RegExp)[];
export type RequestHandlerParams = RequestHandler | ErrorRequestHandler | (RequestHandler | ErrorRequestHandler)[];
type RequestHandlers = RequestHandler[] | RequestHandlerParams[];

function isPathParams(value: any): value is PathParams {
	return (
		typeof value == 'string' || 
		value instanceof RegExp || 
		(
			_.isArray(value) && 
			(
				value.length === 0 || 
				typeof value[0] == 'string' || 
				value[0] instanceof RegExp
			)
		)
	);
}

type ExpressRequestHandlerParams = Express.RequestHandler | Express.ErrorRequestHandler | (Express.RequestHandler | Express.ErrorRequestHandler)[];

type ExpressRequestHandlers = Express.RequestHandler[] | ExpressRequestHandlerParams[];


export default class Router extends RequestHandler {
	
	protected _expressHandler: Express.Router;
	
	get expressHandler(): Express.Router {
		return this._expressHandler ? this._expressHandler : this._expressHandler = Express.Router();
	}
	
	constructor() {
		super();
		this.expressHandler;
		this.init();
	}
	
	protected init() {}
	
	private convertToExpressHandlers(handlers: RequestHandlers): ExpressRequestHandlers {
		// BUG https://goo.gl/3EdrIF
		// Одно из решений проблемы https://toster.ru/q/419241
		return (<(RequestHandler | RequestHandlerParams)[]>handlers).map( 
			handler => handler instanceof RequestHandler || handler instanceof ErrorRequestHandler ? 
				handler.expressHandler : 
				handler.map(handler => handler.expressHandler)
		);
	}
	
	use(...handlers: RequestHandler[]): this
	use(...handlers: RequestHandlerParams[]): this
	use(path: PathParams, ...handlers: RequestHandler[]): this
	use(path: PathParams, ...handlers: RequestHandlerParams[]): this
	use(...args: (PathParams | RequestHandler)[]): this
	use(...args: (PathParams | RequestHandlerParams)[]): this {
		let handlers: RequestHandlers = <RequestHandlers>(isPathParams(args[0]) ? args.slice(1) : args);
		
		let path: PathParams = isPathParams(args[0]) ? <PathParams>args[0] : null;
		
		this.emit('beforeUse', { path, handlers });
		
		
		if (path) {
			this._expressHandler.use(path, ...this.convertToExpressHandlers(handlers));
		} else {
			this._expressHandler.use(...this.convertToExpressHandlers(handlers));
		}
		
		// if (isPathParams(args[0])) {
		// 	let path: PathParams = <PathParams>args[0];
		// 	this._expressHandler.use(path, ...this.convertToExpressHandlers(handlers));
		// } else {
		// 	this._expressHandler.use(...this.convertToExpressHandlers(handlers));
		// }
		
		
		this.emit('use', { path, handlers });
		
		
		return this;
	}
	
	get(path: PathParams, ...handlers: RequestHandler[]): this
	get(path: PathParams, ...handlers: RequestHandlerParams[]): this {
		this._expressHandler.get(path, ...this.convertToExpressHandlers(handlers));
		return this;
	}
	
	post(path: PathParams, ...handlers: RequestHandler[]): this
	post(path: PathParams, ...handlers: RequestHandlerParams[]): this {
		this._expressHandler.get(path, ...this.convertToExpressHandlers(handlers));
		return this;
	}
	
	put(path: PathParams, ...handlers: RequestHandler[]): this
	put(path: PathParams, ...handlers: RequestHandlerParams[]): this {
		this._expressHandler.get(path, ...this.convertToExpressHandlers(handlers));
		return this;
	}
	
	delete(path: PathParams, ...handlers: RequestHandler[]): this
	delete(path: PathParams, ...handlers: RequestHandlerParams[]): this {
		this._expressHandler.get(path, ...this.convertToExpressHandlers(handlers));
		return this;
	}
	
}