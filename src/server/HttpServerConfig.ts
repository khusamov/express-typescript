
import Config from '../config/Config';

export interface IHttpServerConfig {
	port: number;
}

export class HttpServerConfig extends Config {
	
	protected get _defaults(): IHttpServerConfig {
		return {
			port: process.env.PORT || 3000
		};
	}
	
}

export default HttpServerConfig;