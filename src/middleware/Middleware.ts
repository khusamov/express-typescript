
import * as Express from 'express';

export interface IMiddleware {
	(req: Express.Request, res: Express.Response): void;
}

export default class Middleware {
	
	get middleware(): IMiddleware & Express.Application {
		throw new Error('Не определен middleware.');
	}
	
}