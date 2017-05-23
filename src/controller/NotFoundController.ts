
import * as Express from 'express';
import Controller from './Controller';
import NotFound from '../error/4xx/NotFound';

export default class NotFoundController extends Controller {
	
	protected handler(req: Express.Request): NotFound {
		return new NotFound(req);
	}
	
}