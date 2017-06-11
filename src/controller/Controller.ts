
import * as Express from 'express';

import Application from '../router/Application';
import Router from '../router/Router';
import RequestHandler from '../handler/RequestHandler';
//import ControllerStrategy from './ControllerStrategy';

export default class Controller extends RequestHandler {
	
	// constructor() {
	// 	super(new ControllerStrategy);
	// }
	
	get application(): Application {
		return this.endPoint.router instanceof Application ? this.endPoint.router : this.endPoint.router.application;
	}
	
	
	
}