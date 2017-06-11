
import * as Https from 'https';

import Server from '../Server';
import { HttpsServerConfig, IHttpsServerConfig } from './HttpsServerConfig';
import Application from '../../router/Application';

export type THttpsServerConfig = HttpsServerConfig | IHttpsServerConfig;
type TConfigOrApplication = THttpsServerConfig | Application;

export class HttpsServer extends Server {
	
	protected _config: HttpsServerConfig;
	
	protected _server: Https.Server;
	
	constructor(application: Application)
	constructor(config: THttpsServerConfig, application: Application)
	constructor(configOrApplication: TConfigOrApplication, application?: Application) {
		
		let config;
		if (configOrApplication instanceof Application) {
			application = configOrApplication;
		} else {
			config = configOrApplication;
		}
		
		config = config instanceof HttpsServerConfig ? config : new HttpsServerConfig(config);
		super(config, application);
	}
	
	protected createServer(): Https.Server {
		return Https.createServer(this._config, this._application.expressHandler);
	}
	
}