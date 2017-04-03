
import * as Express from 'express';
import AbstractController from './AbstractController';

export default class Controller extends AbstractController {
	
 	protected _middleware(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
		let result: any = this.handler(req, res, next);
		if (result instanceof Error) result = Promise.reject(result);
		if (!(result instanceof Promise)) result = Promise.resolve(result);
		result.then(result => {
			if (!result) throw new Error('Контроллер не вернул ответ.');
			res.send(result);
		}).catch(next);
	}
	
 	handler(req: Express.Request, res: Express.Response, next: Express.NextFunction): any {
		return "В контроллере не задан обработчик.";
	}
	
}