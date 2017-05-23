
import * as Https from 'https';

import { ServerConfig, IServerConfig } from '../ServerConfig';

// export interface ServerOptions {
//     pfx?: any;
//     key?: any;
//     passphrase?: string;
//     cert?: any;
//     ca?: any;
//     crl?: any;
//     ciphers?: string;
//     honorCipherOrder?: boolean;
//     requestCert?: boolean;
//     rejectUnauthorized?: boolean;
//     NPNProtocols?: any;
//     SNICallback?: (servername: string, cb: (err: Error, ctx: tls.SecureContext) => any) => any;
// }
export interface IHttpsServerConfig extends IServerConfig, Https.ServerOptions {}

export class HttpsServerConfig extends ServerConfig {
	
	protected get _defaults(): IHttpsServerConfig {
		return {
			listenOptions: {
			    port: process.env.PORT || 443
			}
		};
	}
	
}

export default HttpsServerConfig;