
import Config from '../config/Config';
import * as Net from 'net';

export interface IServerConfig {
    listenOptions?: Net.ListenOptions;
}

export class ServerConfig extends Config {
	
	protected get _defaults(): IServerConfig {
		return {};
	}
	
}

export default ServerConfig;