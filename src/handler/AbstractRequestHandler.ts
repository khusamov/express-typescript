
import * as _ from 'lodash';
import * as EventEmitter from 'events';
import * as Express from 'express';

import Pluggable from '../plugin/Pluggable';
import View from '../view/View';
import ViewModel from '../view/ViewModel';
import Request from '../http/Request';
import Response from '../http/Response';
import Parameter from '../http/Parameter';

import RedirectRequestHandlerPlugin from './plugin/RedirectRequestHandlerPlugin';
import PathParams from './endPoint/PathParams';
import EndPoint from './endPoint/EndPoint';

/**
 * https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.0.md#operationObject
 */
export const PluggableEventEmitter = Pluggable(EventEmitter);
export default class AbstractRequestHandler extends PluggableEventEmitter {
	
	/**
	 * Конечная точка, в которую входит данных обработчик запроса.
	 */
	endPoint: EndPoint;
	
	/**
	 * Объект запроса. Связан с объектом запроса Экспресса.
	 * Доступен в обработчике сразу после запроса.
	 */
	request: Request;
	
	/**
	 * Объект ответа Экспресса храним отдельно до момента выбора 
	 * обработчиком запроса одного из шаблонов ответа.
	 */
	expressResponse: Express.Response;
	
	/**
	 * Функция next() Экспресса. Доступна в обработчике, но вместо нее следует 
	 * пользоваться плагином redirect.
	 */
	nextFunction: Express.NextFunction;
	
	/**
	 * Перечень входных параметров обработчика ответа.
	 * A list of parameters that are applicable for this operation. If a parameter is already defined at the Path Item, 
	 * the new definition will override it but can never remove it. The list MUST NOT include duplicated parameters. 
	 * A unique parameter is defined by a combination of a name and location.
	 * https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.0.md#operationObject
	 */
	parameters: Parameter[];
	
	/**
	 * Шаблоны ответов.
	 * REQUIRED. The list of possible responses as they are returned from executing this operation.
	 * https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.0.md#operationObject
	 */
	responses: Response[];
	
	/**
	 * The request body applicable for this operation. The requestBody is only supported in HTTP methods 
	 * where the HTTP 1.1 specification RFC7231 has explicitly defined semantics for request bodies. 
	 * In other cases where the HTTP spec is vague, requestBody SHALL be ignored by consumers.
	 * https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.0.md#operationObject
	 */
	requestBody: RequestBody;
	
	get name(): string {
		return this.constructor.name;
	}
	
	private _view: View;
	
	get view() {
		return this._view ? this._view : this._view = new View;
	}

	constructor() {
		super();
		this.registerPlugin(new RedirectRequestHandlerPlugin);
	}
	
	protected handler(...args: any[]): any {
		this.nextFunction();
	}
	
	get expressHandler(): Function {
		return (...args: any[]) => {
			let result;
			if (args.length == 3) {
				// Обычный обработчик.
				this.request = new Request(args[0]);
				//this.response = new Response(args[1]);
				this.expressResponse = args[1] as Express.Response;
				this.nextFunction = args[2];
				result = this.handler();
			} else {
				// Обработчик ошибок, если аргументов 4 шт.
				this.request = new Request(args[1]);
				//this.response = new Response(args[2]);
				this.expressResponse = args[2] as Express.Response;
				this.nextFunction = args[3];
				result = this.handler(args[0]);
			}
			
			// Берем нужный шаблон ответа и в него подставляем объект ответа от Экспресса.
			if (!viewModel.response) throw new Error('В обработчике запроса не выбран шаблон ответа.');
			const response = this.responses.find(response => response.name == viewModel.response);
			if (!response) throw new Error(`Шаблон ответа '${viewModel.response}' не найден.`);
			response.expressResponse = this.expressResponse;
			
			this.render(response, result);
		};
	}
	
	register(obj: any) {
		if (obj instanceof Response) this.responses.push(obj);
	}
	
	/**
	 * Отрисовка результата работы обработчика запроса.
	 * Обработчик запроса может вернуть: ViewModel | Promise<ViewModel>.
	 */
	render(response: Response, viewModelOrPromise: ViewModel | Promise<ViewModel>) {
		
		(
			viewModelOrPromise instanceof Promise ? 
				viewModelOrPromise as Promise<ViewModel> : 
				Promise.resolve(viewModelOrPromise as ViewModel)
		).then(viewModel => {
			try {
				this.view.render(response, viewModel);
			} catch (err) {
				this.onRenderError(err, response, viewModel);
			} finally {
				this.onRenderFinally();
			}
		}).catch(this.nextFunction);
		
		
		// undefined или null
		// ViewModel instanceof ViewModel
		// Ошибку instanceof Error
		// Что-то иное (впоследствии это будет обернуто во ViewModel)
		// Обещание всего перечисленного выше
		
		// if (result instanceof Error) result = Promise.reject(result);
		// if (!(result instanceof Promise)) result = Promise.resolve(result);
		// result.then(result => {
		// 	if (result !== undefined && result !== null) {
		// 		if (result instanceof Error) throw result;
		// 		let viewModel = result instanceof ViewModel ? result : new ViewModel(result);
		// 		try {
		// 			this.view.render(this.response, viewModel);
		// 		} catch (err) {
		// 			this.onRenderError(err, viewModel);
		// 		} finally {
		// 			this.onRenderFinally();
		// 		}
		// 	}
		// }).catch(this.nextFunction);
	}
	
	onRenderError(err: any, response: Response, viewModel: ViewModel): void {
		throw err;
	}
	
	onRenderFinally() {
		// После обработки запроса вид нужно пересоздать заново.
		// Чтобы аварийный рендерер бы заменен на штатный.
		this._view = new View;
	}
	
}