
import * as Express from 'express';

import Application from '../Application';
import Router from '../Router';
import RequestHandler from '../handler/RequestHandler';
//import ControllerStrategy from './ControllerStrategy';

export default class Controller extends RequestHandler {
	
	// constructor() {
	// 	super(new ControllerStrategy);
	// }
	
	get application(): Application {
		return this.ownerRequesHandler instanceof Application ?  this.ownerRequesHandler : (this.ownerRequesHandler as Router).application;
	}
	
	
	
}