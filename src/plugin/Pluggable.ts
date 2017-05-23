
import AbstractPlugin from './AbstractPlugin';
import PluginManager from './PluginManager';
import Constructor from '../Constructor';

export interface Pluggable {
    pluginManager: PluginManager;
    registerPlugin(plugin: AbstractPlugin);
    getPlugin(name: string): AbstractPlugin;
}

export const Pluggable = <S extends Constructor>(Superclass: S): Constructor<Pluggable> & S => class extends Superclass {
    
    private _pluginManager: PluginManager;
    
    get pluginManager(): PluginManager {
		return this._pluginManager ? this._pluginManager : this._pluginManager = new PluginManager(this);
	}
	
	registerPlugin(plugin: AbstractPlugin) {
	    this.pluginManager.register(plugin);
	    return this;
	}
	
	getPlugin(name: string): AbstractPlugin {
	    return this.pluginManager.get(name);
	}
	
}

export default Pluggable;