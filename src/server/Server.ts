
import * as Net from 'net';

import { ServerConfig, IServerConfig } from './ServerConfig';
import Application from '../Application';

export type TConfig = ServerConfig | IServerConfig;
type TConfigOrApplication = TConfig | Application;

abstract class Server {
	
	protected _config: ServerConfig;
	
	protected _application: Application;
	
	protected _server: Net.Server;
	
	constructor(application: Application)
	constructor(config: TConfig, application: Application)
	constructor(configOrApplication: TConfigOrApplication, application?: Application) {
		
		let config;
		if (configOrApplication instanceof Application) {
			application = configOrApplication;
		} else {
			config = configOrApplication;
		}
		
		this._application = application;
		this._config = config instanceof ServerConfig ? config : new ServerConfig(config);
	}
	
	protected abstract createServer(): Net.Server;
	
	listen(): Promise<string> {
		this._server = this.createServer();
		this.runListen();
		return new Promise((resolve, reject) => {
			this._server.on('error', (error: NodeJS.ErrnoException) => {
				if (error.syscall == 'listen') error = this.processServerError(error);
				reject(error);
			});
			this._server.on('listening', none => {
				resolve(this.getBind());
			});
		});
	}
	
	private runListen() {
		if (this._config.get('listenOptions.path')) {
			this._server.listen(this._config.get('listenOptions.path'));
		} else {
			let args = [];
			if (this._config.get('listenOptions.port')) args.push(this._config.get('listenOptions.port'));
			if (this._config.get('listenOptions.host')) args.push(this._config.get('listenOptions.host'));
			if (this._config.get('listenOptions.backlog')) args.push(this._config.get('listenOptions.backlog'));
			this._server.listen.apply(this._server, args);
		}
	}
    
    protected processServerError(error) {
		switch (error.code) {
			case 'EACCES':
				error = new Error(`Адрес ${this.getBind()} требует повышенных привилегий.`)
				break;
			case 'EADDRINUSE':
				error = new Error(`Адрес ${this.getBind()} уже кем-то используется.`)
				break;
		}
		return error;
	}
	
	protected getBind() {
		var addr = this._server.address();
		if (!addr) return "<not address>";
		if (typeof addr === "string") return `Pipe ${addr}`;
		switch (addr.family) {
			case "IPv6": return `[${addr.address}]:${addr.port}`;
			case "IPv4": return `${addr.address}:${addr.port}`;
		}
	}
    
}

export default Server;