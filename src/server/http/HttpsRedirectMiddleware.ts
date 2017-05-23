
import * as Express from 'express';
import Controller from '../../controller/Controller';

export default class HttpsRedirectMiddleware extends Controller {
    
    handler(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
        if (req.protocol === "http") {
			res.redirect(`https://${req.hostname}${req.originalUrl}`);
		} else {
			next();
		}
    }
    
}