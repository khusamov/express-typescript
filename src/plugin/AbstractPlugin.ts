
import PluginManager from './PluginManager';

export default class AbstractPlugin {
    
    pluginManager: PluginManager;
    
    constructor(public name: string) {}
    
    onRegister(owner: any, pluginManager: PluginManager) {}
    
}