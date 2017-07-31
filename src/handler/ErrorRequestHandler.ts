
import * as Express from 'express';
import AbstractRequestHandler from './AbstractRequestHandler';

export default class ErrorRequestHandler extends AbstractRequestHandler {
	
	get expressHandler(): Express.ErrorRequestHandler {
	    return (err: any, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
			super.expressHandler(err, req, res, next);
		};
	}
	
    protected handler(err: any): any {
		this.nextFunction();
	}
	
}