
import * as Express from 'express';

import Request from '../http/Request';
import Response from '../http/Response';
import Application from '../router/Application';
import Router from '../router/Router';
import ErrorRequestHandler from '../handler/ErrorRequestHandler';
//import ControllerStrategy from './ControllerStrategy';
import ErrorViewModel from '../view/ErrorViewModel';
import RendererError from '../view/error/RendererError';
import ViewModel from '../view/ViewModel';

import HttpError from '../http/error/HttpError';
import NotAcceptableError from '../http/error/NotAcceptableError';
import InternalServerErrorStatus from '../http/status/5xxServerError/InternalServerErrorStatus';
import HttpStatus from '../http/status/HttpStatus';

import ErrorRenderer from './ErrorRenderer';

export default class ErrorController extends ErrorRequestHandler {
	
	// constructor() {
	// 	super(new ControllerStrategy);
	// }
	
	
	
	get application(): Application {
		return this.endPoint.router instanceof Application ? this.endPoint.router : this.endPoint.router.application;
	}
	
 	//protected handler(err: any, req: Express.Request, res: Express.Response, next: Express.NextFunction): any {
 	protected handler(err: any): any {
 		
 		
 		// Любой контроллер может вернуть ошибку (почему так произойдет это проблемы 
 		// разработчика контроллера) - наше дело тут обработать эту ситуацию корректно
 		
 		// Контроллер ошибок НЕ ДОЛЖЕН возвращать ошибку, потому что он 
 		// ее должен обработать 
 		
 		
 		this.response.status = this.getStatusFromError(err);
 		
 		// Выводим в консоль сервера сообщение об ошибке.
 		if (err instanceof HttpError) {
 			console.error();
 			console.error(`${this.request.method} ${this.request.path}`);
 		}
 		console.error(err.constructor.name);
 		console.error(err.stack);
 		
 		
 		
 		// Если ошибка NotAcceptableError или ошибка связана с отрисовкой результата, то подключаем аварийный отрисовщик.
 		if (err instanceof RendererError || err instanceof NotAcceptableError) {
 			this.view.renderer = new ErrorRenderer;
 		}
 		
 		// Клиенту также возвращаем сообщение об ошибке.
		return new ErrorViewModel(err);
	}
	
	private getStatusFromError(err: any): HttpStatus {
		return err instanceof HttpError ? err.status : new InternalServerErrorStatus;
	}
	
	onRenderError(err: any, viewModel: ErrorViewModel): void {
		this.view.renderer = new ErrorRenderer;
		
		err.previousError = viewModel.data;
		viewModel.data = err;
		
 		this.response.status = this.getStatusFromError(err);
 		
 		console.error(err.constructor.name);
 		console.error(err.stack);
		
		this.view.render(this.response, viewModel);
	}
	
}