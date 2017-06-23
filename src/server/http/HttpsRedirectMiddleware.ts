
import * as Express from 'express';
import Controller from '../../controller/Controller';

export default class HttpsRedirectMiddleware extends Controller {
    
    handler() {
        if (this.request.protocol === "http") {
			this.response.redirect(`https://${this.request.hostname}${this.request.originalUrl}`);
		} else {
			this.nextFunction();
		}
    }
    
}