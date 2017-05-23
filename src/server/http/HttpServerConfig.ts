
import { ServerConfig, IServerConfig } from '../ServerConfig';

export interface IHttpServerConfig extends IServerConfig {
	httpsRedirectEnable: boolean;
}

export class HttpServerConfig extends ServerConfig {
	
	protected get _defaults(): IHttpServerConfig {
		return {
			httpsRedirectEnable: false,
			listenOptions: {
			    port: new Number(process.env.PORT).valueOf() || 3000
			}
		};
	}
	
}

export default HttpServerConfig;