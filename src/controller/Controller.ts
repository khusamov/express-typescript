
import * as Express from 'express';

import RequestHandler from '../handler/RequestHandler';
import Application from '../router/Application';

export default class Controller extends RequestHandler {
	
	get application(): Application {
		return this.endPoint.router instanceof Application ? this.endPoint.router : this.endPoint.router.application;
	}
	
}