
import * as Express from 'express';
import AbstractRequestHandler from './AbstractRequestHandler';

export default class ErrorRequestHandler extends AbstractRequestHandler {
	
	get expressHandler(): Express.ErrorRequestHandler {
	    return (err: any, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
			super.expressHandler(err, req, res, next);
		};
	}
	
	
    // getExpressRequestHandler(): Express.ErrorRequestHandler {
    //     return this.handler.bind(this);
    // }
    
    protected handler(err: any, req: Express.Request, res: Express.Response, next: Express.NextFunction): any {
		next();
	}
	
	
	
	
}