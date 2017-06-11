
import * as implHandler from 'express-implhandler';

import Router from '../../router/Router';
import AbstractPlugin from '../../plugin/AbstractPlugin';
import PluginManager from '../../plugin/PluginManager';
import NotImplementedController from '../../controller/NotImplementedController';
import NotFoundController from '../../controller/NotFoundController';

/**
 * Плагин для внедрения в приложение обработчика 501 ошибки.
 */
export default class NotImplementedRouterPlugin extends AbstractPlugin {
    
    private notImplementedController: NotImplementedController;
    
    private notImplementedControllerCount = 0;
    
    private get router() {
        return this.pluginManager.owner;
    }
    
    constructor() {
        super('notImplemented');
    }
    
    onRegister(router: Router, pluginManager: PluginManager) {
        router.on('beforeUse', this.onRouterBeforeUse.bind(this));
    }
    
    private onRouterBeforeUse({ path, handlers }) {
        handlers.forEach(handler => {
            // Обработчик implHandler внедряем до NotFoundController контроллера.
            if (handler instanceof NotFoundController) this.registerImplHandler();
        });
    }
    
    private registerImplHandler() {
        this.notImplementedControllerCount++;
        if (this.notImplementedControllerCount > 1) throw new Error('Попытка внедрить в роутер более одного обработчика 501 ошибки.');
        
        this.notImplementedController = new NotImplementedController();
        
        // var app = this.router.expressHandler;
        // var stack = app.stack || app._router && app._router.stack;
        // console.log(this.router.expressHandler)
        
        
        implHandler(
            this.router.expressHandler,
            this.notImplementedController.expressHandler
        );
    }
    
}