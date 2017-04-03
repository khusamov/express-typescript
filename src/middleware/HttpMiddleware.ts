
import * as Express from 'express';
import Middleware from './Middleware';

/**
 * Посредник, содержащий методы обработки HTTP-методов, 
 * которые есть у Router и Application.
 */
export default class HttpMiddleware extends Middleware {
	
	/**
	 * app.use([path,] callback [, callback...])
	 * callback: Function | Application | Router
	 */
	use(...args: any[]) {
		args = this._prepareMiddlewares(args);
		return this.middleware.use.apply(this.middleware, args);
	}
	
	get(...args: any[]) {
		args = this._prepareMiddlewares(args);
		return this.middleware.get.apply(this.middleware, args);
	}
	
	private _prepareMiddlewares(args: any[]) {
		return args.map(item => item instanceof Middleware ? item.middleware : item);
	}
	
}