
import * as Http from 'http';

import Server from '../Server';
import { HttpServerConfig, IHttpServerConfig } from './HttpServerConfig';
import Application from '../../Application';
import HttpsRedirectMiddleware from './HttpsRedirectMiddleware';

export type THttpServerConfig = HttpServerConfig | IHttpServerConfig;
type TConfigOrApplication = THttpServerConfig | Application;

export class HttpServer extends Server {
	
	protected _config: HttpServerConfig;
	
	protected _server: Http.Server;
	
	constructor(application: Application)
	constructor(config: THttpServerConfig, application: Application)
	constructor(configOrApplication: TConfigOrApplication, application?: Application) {
		
		let config;
		if (configOrApplication instanceof Application) {
			application = configOrApplication;
		} else {
			config = configOrApplication;
		}
		
		config = config instanceof HttpServerConfig ? config : new HttpServerConfig(config);
		
		super(config, application);
		
		if (config.get('httpsRedirectEnable')) application.use(new HttpsRedirectMiddleware);
	}
	
	protected createServer(): Http.Server {
		return Http.createServer(this._application.expressHandler);
	}
	
}