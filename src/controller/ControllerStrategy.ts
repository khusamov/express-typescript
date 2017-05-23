


// ВРЕМЕННО ЭТОТ КЛАСС НЕ ИСПОЛЬЗУЕТСЯ


import * as Express from 'express';
import AbstractRequestHandlerStrategy from '../handler/AbstractRequestHandlerStrategy';
import ViewModel from '../view/ViewModel';
import View from '../view/View';

export default class ControllerStrategy extends AbstractRequestHandlerStrategy {
	
	// render(result: any) {
		
	// 	// Контроллер может вернуть:
	// 	// undefined или null
	// 	// ViewModel instanceof ViewModel
	// 	// Ошибку instanceof Error
	// 	// Что-то иное (впоследствии это будет обернуто во ViewModel)
	// 	// Обещание всего перечисленного выше
		
	// 	let res = this.requestHandler.response;
	// 	let next = this.requestHandler.nextFunction;
		
	// 	if (result !== undefined && result !== null) {
	// 		if (result instanceof Error) result = Promise.reject(result);
	// 		if (!(result instanceof Promise)) result = Promise.resolve(result);
	// 		result.then(result => {
	// 			if (result !== undefined && result !== null) {
	// 				if (result instanceof Error) throw result;
	// 				let viewModel = result instanceof ViewModel ? result : new ViewModel(result);
	// 				this.requestHandler.view.render(res, viewModel);
	// 			}
	// 		}).catch(next);
	// 	}
	// }
	
}