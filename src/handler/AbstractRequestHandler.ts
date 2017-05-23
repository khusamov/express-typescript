
import * as EventEmitter from 'events';
import * as Express from 'express';

//import AbstractRequestHandlerStrategy from './AbstractRequestHandlerStrategy';
import RedirectRequestHandlerPlugin from './plugin/RedirectRequestHandlerPlugin';
import Pluggable from '../plugin/Pluggable';
import View from '../view/View';
import ViewModel from '../view/ViewModel';

export const PluggableEventEmitter = Pluggable(EventEmitter);

export default class AbstractRequestHandler extends PluggableEventEmitter {
	
	private _error: any;
	
	private _view: View;
	
	request: Express.Request;
	
	response: Express.Response;
	
	nextFunction: Express.NextFunction;
	
	get view() {
		return this._view ? this._view : this._view = new View;
	}

	//constructor(protected requestHandlerStrategy?: AbstractRequestHandlerStrategy) {
	constructor() {
		super();
		this.registerPlugin(new RedirectRequestHandlerPlugin);
		// if (requestHandlerStrategy) {
		// 	requestHandlerStrategy.requestHandler = this;
		// }
	}
	
	protected handler(...args: any[]): any {}
	
	//get expressHandler(): Express.ErrorRequestHandler | Express.RequestHandler {
	get expressHandler(): Function {
		
		return (...args: any[]) => {
			let result = this.handler.apply(this, args);
			
			if (args.length == 3) {
				this.request = args[0];
				this.response = args[1];
				this.nextFunction = args[2];
			} else {
				this._error = args[0];
				this.request = args[1];
				this.response = args[2];
				this.nextFunction = args[3];
			}
			
			// if (this.requestHandlerStrategy) {
			// 	this.render(result);
			// }
			
			this.render(result);
			
		};
		
		
		// return this.handler.length == 4 ? 
		// 	(err: any, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
		// 		handler(err, req, res, next);
		// 	} : (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
		// 		handler(req, res, next);
		// 	};
		
	}
	
	render(result: any) {
		
		// Контроллер может вернуть:
		// undefined или null
		// ViewModel instanceof ViewModel
		// Ошибку instanceof Error
		// Что-то иное (впоследствии это будет обернуто во ViewModel)
		// Обещание всего перечисленного выше
		
		if (result instanceof Error) result = Promise.reject(result);
		if (!(result instanceof Promise)) result = Promise.resolve(result);
		result.then(result => {
			if (result !== undefined && result !== null) {
				if (result instanceof Error) throw result;
				let viewModel = result instanceof ViewModel ? result : new ViewModel(result);
				try {
					this.view.render(this.response, viewModel);
				} catch (err) {
					this.onRenderError(err, this.response, viewModel);
				} finally {
					this.onRenderFinally();
				}
			}
		}).catch(this.nextFunction);
		
		// if (result !== undefined && result !== null) {
		// 	if (result instanceof Error) result = Promise.reject(result);
		// 	if (!(result instanceof Promise)) result = Promise.resolve(result);
		// 	result.then(result => {
		// 		if (result !== undefined && result !== null) {
		// 			if (result instanceof Error) throw result;
		// 			let viewModel = result instanceof ViewModel ? result : new ViewModel(result);
		// 			this.view.render(this.response, viewModel);
		// 		}
		// 	}).catch(this.nextFunction);
		// }
	}
	
	onRenderError(err: any, response: Express.Response, viewModel: ViewModel): void {
		throw err;
	}
	
	onRenderFinally() {
		// После обработки запроса вид нужно пересоздать заново.
		// Чтобы аварийный рендерер бы заменен на штатный.
		this._view = new View;
	}
	
}