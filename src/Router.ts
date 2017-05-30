
import * as _ from 'lodash';
import * as Express from 'express';
import Application from './Application';
import RequestHandler from './handler/RequestHandler';
import ErrorRequestHandler from './handler/ErrorRequestHandler';
import AbstractRequestHandler from './handler/AbstractRequestHandler';

export type PathParams = string | RegExp | (string | RegExp)[];
export type RequestHandlerParams = RequestHandler | ErrorRequestHandler | (RequestHandler | ErrorRequestHandler)[];
type RequestHandlers = RequestHandler[] | RequestHandlerParams[];

function isPathParams(value: any): value is PathParams {
	return (
		typeof value == 'string' || value instanceof RegExp || (
			_.isArray(value) && (
				value.length === 0 || 
				typeof value[0] == 'string' || 
				value[0] instanceof RegExp
			)
		)
	);
}

export interface IEndPoint {
	path: PathParams;
	method: string;
	handlers: AbstractRequestHandler[];
}

type ExpressRequestHandlerParams = Express.RequestHandler | Express.ErrorRequestHandler | (Express.RequestHandler | Express.ErrorRequestHandler)[];

type ExpressRequestHandlers = Express.RequestHandler[] | ExpressRequestHandlerParams[];


export default class Router extends RequestHandler {
	
	protected _expressHandler: Express.Router;
	
	private _endPoints: IEndPoint[];
	
	get endPoints(): IEndPoint[] {
		return this._endPoints ? this._endPoints : this._endPoints = [];
	}
	
	get expressHandler(): Express.Router {
		return this._expressHandler ? this._expressHandler : this._expressHandler = Express.Router();
	}
	
	get application(): Application {
		return this.ownerRequesHandler instanceof Application ?  this.ownerRequesHandler : (this.ownerRequesHandler as Router).application;
	}
	
	constructor() {
		super();
		this.expressHandler;
		this.init();
	}
	
	protected init() {}
	
	private getExpressHandlers(handlers: RequestHandlers): ExpressRequestHandlers {
		// BUG https://goo.gl/3EdrIF
		// Одно из решений проблемы https://toster.ru/q/419241
		
		return _.flatten(handlers).map(handler => handler.expressHandler);
		
		
		// return (<(RequestHandler | RequestHandlerParams)[]>handlers).map( 
		// 	handler => handler instanceof RequestHandler || handler instanceof ErrorRequestHandler ? 
		// 		handler.expressHandler : 
		// 		handler.map(handler => handler.expressHandler)
		// );
	}
	
	private registerEndPoint(method: string, path: PathParams, handlers: RequestHandlers): this {
		
		let flattenedHandlers = _.flatten(handlers);
		
		flattenedHandlers.forEach(handler => handler.ownerRequesHandler = this);
		
		this.endPoints.push({
			path: path,
			method: method,
			handlers: flattenedHandlers
		});
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
		
		this.emit('beforeUse', { path, handlers });
		
		
		this.registerEndPoint('use', path ? path : '/', handlers);
		if (path) {
			this._expressHandler.use(path, ...this.getExpressHandlers(handlers));
		} else {
			this._expressHandler.use(...this.getExpressHandlers(handlers));
		}
		
		
		
		this.emit('use', { path, handlers });
		
		
		return this;
	}
	
	get(path: PathParams, ...handlers: RequestHandler[]): this
	get(path: PathParams, ...handlers: RequestHandlerParams[]): this {
		this.registerEndPoint('get', path, handlers);
		this._expressHandler.get(path, ...this.getExpressHandlers(handlers));
		return this;
	}
	
	post(path: PathParams, ...handlers: RequestHandler[]): this
	post(path: PathParams, ...handlers: RequestHandlerParams[]): this {
		this.registerEndPoint('post', path, handlers);
		this._expressHandler.post(path, ...this.getExpressHandlers(handlers));
		return this;
	}
	
	put(path: PathParams, ...handlers: RequestHandler[]): this
	put(path: PathParams, ...handlers: RequestHandlerParams[]): this {
		this.registerEndPoint('put', path, handlers);
		this._expressHandler.put(path, ...this.getExpressHandlers(handlers));
		return this;
	}
	
	delete(path: PathParams, ...handlers: RequestHandler[]): this
	delete(path: PathParams, ...handlers: RequestHandlerParams[]): this {
		this.registerEndPoint('delete', path, handlers);
		this._expressHandler.delete(path, ...this.getExpressHandlers(handlers));
		return this;
	}
	
}