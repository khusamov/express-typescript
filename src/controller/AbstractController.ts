
import * as Express from 'express';
import Middleware from '../middleware/Middleware';
import { IMiddleware } from '../middleware/Middleware';

export default class AbstractController extends Middleware {
	
	get middleware(): IMiddleware {
		return this._middleware.bind(this);
	}
	
	protected _middleware(...args: any[]) {}
	
}