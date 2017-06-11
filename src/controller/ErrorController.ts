
import * as Express from 'express';

import Application from '../router/Application';
import Router from '../router/Router';
import ErrorRequestHandler from '../handler/ErrorRequestHandler';
//import ControllerStrategy from './ControllerStrategy';
import ErrorViewModel from '../view/ErrorViewModel';
import HttpException from '../error/HttpException';
import NotAcceptable from '../error/4xx/NotAcceptable';
import RendererError from '../view/error/RendererError';
import ViewModel from '../view/ViewModel';

import ErrorRenderer from './ErrorRenderer';

export default class ErrorController extends ErrorRequestHandler {
	
	// constructor() {
	// 	super(new ControllerStrategy);
	// }
	
	
	
	get application(): Application {
		return this.endPoint.router instanceof Application ? this.endPoint.router : this.endPoint.router.application;
	}
	
 	protected handler(err: any, req: Express.Request, res: Express.Response, next: Express.NextFunction): any {
 		
 		
 		// Любой контроллер может вернуть ошибку (почему так произойдет это проблемы 
 		// разработчика контроллера) - наше дело тут обработать эту ситуацию корректно
 		
 		// Контроллер ошибок НЕ ДОЛЖЕН возвращать ошибку, потому что он 
 		// ее должен обработать 
 		
 		
 		let status = err instanceof HttpException ? err.status : 500;
 		res.status(status);
 		
 		// Выводим в консоль сервера сообщение об ошибке.
 		if (err instanceof HttpException) {
 			console.error();
 			console.error(`${req.method} ${req.path}`);
 		}
 		console.error(err.stack);
 		
 		
 		
 		// Если ошибка NotAcceptable или ошибка связана с отрисовкой результата, то подключаем аварийный отрисовщик.
 		if (err instanceof RendererError || err instanceof NotAcceptable) {
 			this.view.renderer = new ErrorRenderer;
 		}
 		
 		// Клиенту также возвращаем сообщение об ошибке.
		return new ErrorViewModel(err);
	}
	
	onRenderError(err: any, res: Express.Response, viewModel: ErrorViewModel): void {
		this.view.renderer = new ErrorRenderer;
		
		err.previousError = viewModel.data;
		viewModel.data = err;
		
 		let status = err instanceof HttpException ? err.status : 500;
 		res.status(status);
 		
 		console.error(err.stack);
		
		//viewModel.data.previousError = err;
		this.view.render(this.response, viewModel);
	}
	
}