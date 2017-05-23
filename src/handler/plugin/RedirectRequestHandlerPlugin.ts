
import AbstractPlugin from '../../plugin/AbstractPlugin';
//import AbstractPlugin from 'khusamov-express-typescript/dist/plugin/AbstractPlugin';
import AbstractRequestHandler from '../AbstractRequestHandler';

export default class RedirectRequestHandlerPlugin extends AbstractPlugin {
    
    get requestHandler(): AbstractRequestHandler {
        return this.pluginManager.owner;
    }
    
    constructor() {
        super('redirect');
    }
    
    toNextController() {
        this.requestHandler.nextFunction();
    }
    
    toRouter() {
        this.requestHandler.nextFunction('router');
    }
    
    toRoute() {
        this.requestHandler.nextFunction('route');
    }
    
    toUrl(url: string) {
        this.requestHandler.response.redirect(url);
    }
    
}