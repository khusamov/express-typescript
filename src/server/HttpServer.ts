
import * as _ from 'lodash';
import * as Http from 'http';
import { HttpServerConfig, IHttpServerConfig } from './HttpServerConfig';
import Middleware from 'middleware/Middleware';

export class HttpServer {
	
	private _middleware: Middleware;
	
	private _config: HttpServerConfig;
	
	constructor(middleware: Middleware, config: HttpServerConfig | IHttpServerConfig = <IHttpServerConfig>{}) {
		this._middleware = middleware;
		this._config = new HttpServerConfig(config);
	}
	
	listen() {
		const port = this._config.get('port');
		const server = Http.createServer(this._middleware.middleware);
		
		server.listen(port);
		
		return new Promise((resolve, reject) => {
			
			server.on('error', (error: NodeJS.ErrnoException) => {
				if (error.syscall !== 'listen') reject(error);
				
				switch (error.code) {
					case 'EACCES':
						reject(new Error('Port ' + port + ' requires elevated privileges.'));
						break;
					case 'EADDRINUSE':
						reject(new Error('Port ' + port + ' is already in use.'));
						break;
					default:
						reject(error);
				}
			});
			
			server.on('listening', none => {
				var addr = server.address();
				var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
				resolve(bind);
			});
			
		});
		
		
		
	}
	
	
}