
import * as Express from 'express';
import Controller from './Controller';
import NotImplemented from '../error/5xx/NotImplemented';

export default class NotImplementedController extends Controller {
	
	protected handler(req: Express.Request): NotImplemented {
		return new NotImplemented(req);
	}
	
}