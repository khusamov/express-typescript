
import * as _ from 'lodash';
import * as Express from 'express';
import Application from './Application';
import { PathParams, isPathParams } from './PathParams';
import RequestHandler from '../handler/RequestHandler';
import ErrorRequestHandler from '../handler/ErrorRequestHandler';
import AbstractRequestHandler from '../handler/AbstractRequestHandler';
import EndPoint from './EndPoint';

type ExpressRequestHandlerParams = Express.RequestHandler | Express.ErrorRequestHandler | (Express.RequestHandler | Express.ErrorRequestHandler)[];
type ExpressRequestHandlers = Express.RequestHandler[] | ExpressRequestHandlerParams[];

export type RequestHandlerParams = RequestHandler | ErrorRequestHandler | (RequestHandler | ErrorRequestHandler)[];
type RequestHandlers = RequestHandler[] | RequestHandlerParams[];

// export interface IEndPoint {
// 	path: PathParams;
// 	method: string;
// 	handlers: AbstractRequestHandler[];
// }

// export interface IApiEndPoint {
// 	path: PathParams;
// 	method: string;
// 	handler: AbstractRequestHandler;
// }

export default class Router extends RequestHandler {
	
	protected _expressHandler: Express.Router;
	
	get expressHandler(): Express.Router {
		return this._expressHandler ? this._expressHandler : this._expressHandler = Express.Router();
	}
	
	private _endPoints: EndPoint[];
	
	get endPoints(): EndPoint[] {
		return this._endPoints ? this._endPoints : this._endPoints = [];
	}
	
	get api(): EndPoint[] {
		return this.getEndPoints(true).filter(endPoint => endPoint.method != 'use');
	}
	
	// get api(): IApiEndPoint[] {
	// 	return this.endPoints.reduce((result, endPoint) => {
	// 		return result.concat(_.flatten(endPoint.handlers.map(handler => {
	// 			return handler instanceof Router ? (handler as Router).api : {
	// 				path: endPoint.path,
	// 				method: endPoint.method,
	// 				handler
	// 			};
	// 		})))
	// 	}, []);
	// }
	
	// get application(): Application {
	// 	return this.ownerRequesHandler instanceof Application ?  this.ownerRequesHandler : (this.ownerRequesHandler as Router).application;
	// }
	
	get application(): Application {
		return this.endPoint.router instanceof Application ? this.endPoint.router : this.endPoint.router.application;
	}
	
	constructor() {
		super();
		this.expressHandler;
		this.init();
	}
	
	/**
	 * Метод, предназначенный для получения конечных точек как в виде исходного дерева, так в виде одноуровневого списка.
	 */
	getEndPoints(flatten: boolean = false): EndPoint[] {
		if (flatten) {
			return this.endPoints.reduce((result, endPoint) => {
				const routers: Router[] = endPoint.handlers.reduce((result, handler) => handler instanceof Router ? result.concat(handler) : result, []);
				result = routers.length > 1 ? result.concat(endPoint) : result;
				return result.concat(routers.length ? _.flatten(routers.map(router => router.getEndPoints(true))) : endPoint);
			}, []);
		}
		return this.endPoints;
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
		
		
		// flattenedHandlers.forEach(handler => {
		// 	if (handler.endPoint) throw new Error(`Попытка перезаписи владельца обработчика '${handler.constructor.name}'.`);
		// });
		
		
		
		
		// flattenedHandlers.forEach(handler => {
		// 	handler.path = path;
		// 	handler.method = method;
		// 	handler.ownerRequesHandler = this;
		// });
		
		const endPoint = new EndPoint({
			path: path,
			method: method,
			handlers: flattenedHandlers,
			router: this
		});
		
		flattenedHandlers.forEach(handler => {
			// Сделано искусственное ограничение. У обработчика не может быть более одного владельца. Хотя в Экспрессе это допускается.
			if (handler.endPoint) throw new Error(`Попытка перезаписи владельца обработчика '${handler.constructor.name}'.`);
			handler.endPoint = endPoint;
		});
		
		this.endPoints.push(endPoint);
		// this.endPoints.push({
		// 	path: path,
		// 	method: method,
		// 	handlers: flattenedHandlers
		// });
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