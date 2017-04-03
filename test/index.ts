
import { HttpServer, Application } from '../index';
import TestApplication from './app/TestApplication';

let app = new TestApplication();

let server = new HttpServer(app);

server.listen().then(bind => {
	console.log(`Listening on ${bind}`);
}).catch(err => {
	console.error(err);
});