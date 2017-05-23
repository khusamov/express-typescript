
import AbstractPlugin from './AbstractPlugin';

export default class PluginManager {
    
    private plugins: AbstractPlugin[] = [];
    
    get count(): number {
        return 0;
    }
    
    constructor(public owner: any) {
        
    }
    
    register(plugin: AbstractPlugin): this {
        this.plugins.push(plugin);
        plugin.pluginManager = this;
        plugin.onRegister(this.owner, this);
        return this;
    }
    
    unregister() {}
    
    get(name: string): AbstractPlugin {
        return this.plugins.find(plugin => plugin.name == name);
    }
    
    each() {}
    
    destroy() {}
    
}