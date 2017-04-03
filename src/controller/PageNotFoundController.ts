
import * as Express from 'express';
import Controller from './Controller';
import PageNotFoundError from './PageNotFoundError';

export default class PageNotFoundController extends Controller {
	
	handler(req: Express.Request, res: Express.Response, next: Express.NextFunction): PageNotFoundError {
		return new PageNotFoundError(req);
	}
	
}