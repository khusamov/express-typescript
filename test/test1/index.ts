
import { HttpServer, Application } from '../../index';
import TestApplication from './app/TestApplication';

/**
 * Тестовый пример создания обычного сайта.
 */

let app = new TestApplication();

let server = new HttpServer(app);

server.listen().then(bind => {
	console.log(`Listening on address ${bind}`);
}).catch(err => {
	console.error(err);
});