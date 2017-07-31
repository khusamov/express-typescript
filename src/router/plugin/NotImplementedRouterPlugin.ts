
import * as implHandler from 'express-implhandler';

import Router from '../../router/Router';
import AbstractPlugin from '../../plugin/AbstractPlugin';
import PluginManager from '../../plugin/PluginManager';
import NotImplementedController from '../../controller/NotImplementedController';
import NotFoundController from '../../controller/NotFoundController';

/**
 * Плагин для внедрения в приложение обработчика 501-й ошибки Express Implhandler.
 * https://www.npmjs.com/package/express-implhandler
 * 
 * 501 Not Implemented — сервер не поддерживает возможностей, необходимых для обработки запроса. 
 * Типичный ответ для случаев, когда сервер не понимает указанный в запросе метод. 
 * Если же метод серверу известен, но он не применим к данному ресурсу, то нужно вернуть ответ 405. 
 * Появился в HTTP/1.0.
 * 
 * По умолчанию внедрен в класс Application.
 */
export default class NotImplementedRouterPlugin extends AbstractPlugin {
    
    private notImplementedController: NotImplementedController;
    
    private notImplementedControllerCount: number = 0;
    
    private get router(): Router {
        return this.pluginManager.owner;
    }
    
    constructor() {
        super('notImplemented');
        if (!(this.router instanceof Router)) throw new Error('Попытка подключить обработчик 501 ошибки не к роутеру.');
    }
    
    onRegister(router: Router, pluginManager: PluginManager) {
        router.on('beforeUse', this.onRouterBeforeUse.bind(this));
    }
    
    private onRouterBeforeUse({ path, handlers }: { path: PathParams; handlers: RequestHandler[] }) {
        handlers.forEach(handler => {
            // Обработчик implHandler внедряем до NotFoundController контроллера.
            if (handler instanceof NotFoundController) this.registerImplHandler();
        });
    }
    
    private registerImplHandler() {
        this.notImplementedControllerCount++;
        if (this.notImplementedControllerCount > 1) throw new Error('Попытка внедрить в роутер более одного обработчика 501 ошибки.');
        
        this.notImplementedController = new NotImplementedController();
        
        implHandler(
            this.router.expressHandler,
            this.notImplementedController.expressHandler
        );
    }
    
}