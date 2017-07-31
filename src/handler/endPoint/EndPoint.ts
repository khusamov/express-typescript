
import * as _ from 'lodash';
import * as Path from 'path';

import Parameter from '../../http/Parameter';
import Response from '../../http/Response';
import Router from '../../router/Router';
import AbstractRequestHandler from '../../handler/AbstractRequestHandler';

import EndPointPath from './EndPointPath';
import PathParams from './PathParams';

export interface IFreeEndPoint {
	path: PathParams;
	method: string;
	router?: Router;
	handlers?: AbstractRequestHandler[];
	description?: string;
}

export interface IEndPoint extends IFreeEndPoint {
	router: Router;
}

export default class EndPoint {
	
	handlers: AbstractRequestHandler[] = [];
	
	/**
	 * Роутер-владелец конечной точки.
	 */
	router: Router;
	
	description: string;
	
	/**
	 * Входные параметры конечной точки это список параметров всех ее обработчиков. 
	 */
	get parameters(): Parameter[] {
		return this.handlers.reduce((result, handler) => result.concat(handler.parameters), []);
	}
	
	/**
	 * Шаблоны ответов конечной точки это список шаблонов ответов всех ее обработчиков. 
	 */
	get responses(): Response[] {
		return this.handlers.reduce((result, handler) => result.concat(handler.responses), []);
	}
	
	deprecated: boolean = false;

	path: EndPointPath;

	private _method: string;
	
	get method() {
		return this._method;
	}
	
	set method(method) {
		this._method = method.toLowerCase();
	}
	
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
	
	constructor({ path, method, router, handlers, description, parameters, responses }: IEndPoint) {
	    this.path = new EndPointPath(path, this);
	    this.method = method;
	    this.router = router;
	    if (handlers) this.handlers = handlers;
	    if (description) this.description = description;
	}
	
}