
import * as _ from 'lodash';
import * as Path from 'path';

import Router from '../router/Router';
import PathParams from '../router/PathParams';
import AbstractRequestHandler from '../handler/AbstractRequestHandler';
import EndPointPath from './EndPointPath';

export interface IEndPoint {
	path: PathParams;
	method: string;
	handlers: AbstractRequestHandler[];
	router: Router;
}

export default class EndPoint {

	path: EndPointPath;

	// private _path: EndPointPath;
	
	// get path(): EndPointPath {
	// 	return this._path;
	// }
	
	// set path(path: EndPointPath) {
	// 	this._path = path;
	// }
	
	private _method: string;
	
	get method() {
		return this._method;
	}
	
	set method(method) {
		this._method = method.toLowerCase();
	}
	
	handlers: AbstractRequestHandler[];
	
	router: Router;
	
	get parent(): EndPoint {
		return this.router.endPoint;
	}
	
	get ancestors(): EndPoint[] {
		let result = [];
		if (this.parent) {
			result.push(this.parent);
			result = result.concat(this.parent.ancestors);
		}
		return result;
	}
	
	constructor({ path, method, handlers, router }: IEndPoint) {
	    this.path = new EndPointPath(path, this);
	    this.method = method;
	    this.handlers = handlers;
	    this.router = router;
	}
	
}