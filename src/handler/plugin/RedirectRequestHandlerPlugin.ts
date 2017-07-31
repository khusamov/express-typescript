
import AbstractPlugin from '../../plugin/AbstractPlugin';
import PluginManager from '../../plugin/PluginManager';
import HttpStatus from '../../http/status/HttpStatus';
import FoundStatus from '../../http/status/3xxRedirection/FoundStatus';
import AbstractRequestHandler from '../AbstractRequestHandler';

/**
 * Плагин для предоставления обработчику запроса методов передачи управления:
 * 1) в следующий обработчик
 * 2) в следующий роутер
 * 3) в следующий маршрут
 * 4) на другой URL
 * 
 * По умолчанию внедрен в класс AbstractRequestHandler.
 */
export default class RedirectRequestHandlerPlugin extends AbstractPlugin {
    
    get requestHandler(): AbstractRequestHandler {
        return this.pluginManager.owner;
    }
    
    constructor() {
        super('redirect');
    }
    
    onRegister(requestHandler: AbstractRequestHandler, pluginManager: PluginManager) {
        requestHandler.register(new Response({
			name: 'redirect',
			status: new FoundStatus,
			description: 'Запрошенный документ временно доступен по другому адресу.'
		}));
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
    
    toUrl(url: string, status?: HttpStatus): ViewModel {
        //this.requestHandler.response.redirect(url);
        
        
        
        
        if (status && Math.round(status.code / 100) != 3) {
            throw new Error('Статус редиректа должен начинаться на цифру 3.');
        }
        
        
        
        
        return new ViewModel({
            redirect: { url, status },
			response: 'redirect'
		});
        
        
    }
    
}