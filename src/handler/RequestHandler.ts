
import * as Express from 'express';
import AbstractRequestHandler from './AbstractRequestHandler';

export default class RequestHandler extends AbstractRequestHandler {
	
	get expressHandler(): Express.RequestHandler {
	    return (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
			super.expressHandler(req, res, next);
		};
	}
	
}