
import * as Express from 'express';

import Request from '../http/Request';
import Response from '../http/Response';
import Application from '../router/Application';
import Router from '../router/Router';
import ErrorRequestHandler from '../handler/ErrorRequestHandler';
import ErrorViewModel from '../view/ErrorViewModel';
import RendererError from '../view/error/RendererError';
import ViewModel from '../view/ViewModel';

import HttpError from '../http/error/HttpError';
import NotAcceptableError from '../http/error/NotAcceptableError';
import InternalServerErrorStatus from '../http/status/5xxServerError/InternalServerErrorStatus';
import HttpStatus from '../http/status/HttpStatus';

import ErrorRenderer from './ErrorRenderer';

/**
 * Внимание!
 * Раньше ErrorController обрабатывал все ошибки, сейчас он будет обрабатывать только непредвиденные
 * ошибки. Ранее Контроллеры возвращали и модель вида и ошибки (предвиденные), теперь они
 * будут возвращать только модель вида, а заранее известные ошибки будут обрабатывать сами и упаковывать
 * в модель вида.
 */
export default class ErrorController extends ErrorRequestHandler {
	
	get application(): Application {
		return this.endPoint.router instanceof Application ? this.endPoint.router : this.endPoint.router.application;
	}
	
	protected initRequestHandler() {
		this.register(new Response({
			name: 'internalServerError',
			status: new InternalServerErrorStatus,
			description: 'Внутренняя ошибка сервера.'
		}));
	}
	
	/**
	 * Любой контроллер может вернуть ошибку (почему так произойдет это проблемы 
	 * разработчика контроллера) - наше дело тут обработать эту ситуацию корректно
	 * Контроллер ошибок НЕ ДОЛЖЕН возвращать ошибку, потому что он ее должен обработать
	 */
 	protected handler(err: any): any {
 		
 		this.consoleError(err);
 		
 		// Если ошибка связана с отрисовкой результата, то подключаем аварийный отрисовщик.
 		if (err instanceof RendererError) this.view.renderer = new ErrorRenderer;
 		
		return new ErrorViewModel({
			error: err,
			response: 'internalServerError'
		});
		
	}
	
	/**
	 * Обработчик ошибок отрисовщика ответа.
	 */
	onRenderError(err: any, response: Response, viewModel: ErrorViewModel): void {
		this.view.renderer = new ErrorRenderer;
		
		err.previousError = viewModel.error;
		viewModel.error = err;
		
 		this.consoleError(err);
		
		this.view.render(response, viewModel);
	}
	
	private consoleError(err: any) {
		console.error();
 		//console.error(`${this.request.method} ${this.request.path}`);
		console.error(err.constructor.name);
 		console.error(err.stack);
	}
	
}