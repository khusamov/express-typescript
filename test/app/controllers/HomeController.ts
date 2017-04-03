
import * as Express from 'express';
import { Controller } from '../../../index';

export default class HomeController extends Controller {
	
	handler(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
		return "Привет мир!";
	}
	
}