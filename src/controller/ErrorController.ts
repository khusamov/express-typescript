
import * as Express from 'express';
import AbstractController from './AbstractController';
import PageNotFoundError from './PageNotFoundError';

export default class ErrorController extends AbstractController {
	
 	protected _middleware(err: any, req: Express.Request, res: Express.Response, next: Express.NextFunction) {
		let result: any = this.handler(err, req, res, next);
		if (result instanceof Error) result = Promise.reject(result);
		if (!(result instanceof Promise)) result = Promise.resolve(result);
		result.then(result => {
			if (!result) throw new Error('Контроллер не вернул ответ.');
			res.send(result);
		}).catch(err => {
			console.error(err);
		});
	}
	
 	handler(err: any, req: Express.Request, res: Express.Response, next: Express.NextFunction) {
 		res.status(500);
 		if (err instanceof PageNotFoundError) res.status(404);
 		console.error(err);
		return err.toString();
	}
	
}