
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

export const PluggableEventEmitter = Pluggable(EventEmitter);
export default class AbstractRequestHandler extends PluggableEventEmitter {
	
	/**
	 * Конечная точка, в которую входит данных обработчик запроса.
	 */
	endPoint: EndPoint;
	
	request: Request;
	
	/**
	 * Объект ответа Экспресса храним отдельно до момента выбора 
	 * обработчиком запроса одного из шаблонов ответа.
	 */
	expressResponse: Express.Response;
	
	nextFunction: Express.NextFunction;
	
	/**
	 * Перечень входных параметров обработчика ответа.
	 */
	parameters: Parameter[];
	
	/**
	 * Шаблоны ответов.
	 */
	responses: Response[];
	
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