
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

/**
 * https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.0.md#operationObject
 */
export default class EndPoint {
	
	/**
	 * Массив обработчиков, которые входят в данную конечную точку.
	 * http://expressjs.com/en/4x/api.html#app.METHOD
	 */
	handlers: AbstractRequestHandler[] = [];
	
	/**
	 * Роутер-владелец конечной точки.
	 */
	router: Router;
	
	/**
	 * A verbose explanation of the operation behavior. 
	 * https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.0.md#operationObject
	 */
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
	
	/**
	 * Этот параметр пока под вопросом - как его реализовать не ясно.
	 * 
	 * В конечной точке надо определить requestBody, но он должен быть в одном числе. 
	 * Но какой requestBody брать из обработчиков конечной точки не ясно.
	 * 
	 * 
	 * The request body applicable for this operation. The requestBody is only supported in HTTP methods 
	 * where the HTTP 1.1 specification RFC7231 has explicitly defined semantics for request bodies. 
	 * In other cases where the HTTP spec is vague, requestBody SHALL be ignored by consumers.
	 * https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.0.md#operationObject
	 */
	requestBody(): RequestBody {
		
	}
	
	/**
	 * Declares this operation to be deprecated. Consumers SHOULD refrain from usage of the 
	 * declared operation. Default value is false.
	 * https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.0.md#operationObject
	 */
	deprecated: boolean = false;

	/**
	 * The path for which the middleware function is invoked; can be any of:
	 * A string representing a path.
	 * A path pattern.
	 * A regular expression pattern to match paths.
	 * An array of combinations of any of the above.
	 * http://expressjs.com/en/4x/api.html#app.METHOD
	 * http://expressjs.com/en/4x/api.html#path-examples
	 * https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.0.md#pathsObject
	 */
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