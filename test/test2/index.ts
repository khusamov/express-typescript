
import { HttpServer, Application } from 'khusamov-express-typescript';
import PetStoreApplication from './app/PetStoreApplication';

/**
 * Тестовый пример создания сервера API.
 */

let app = new PetStoreApplication;

let server = new HttpServer(app);

server.listen().then(bind => {
	console.log(`Listening on address ${bind}`);
}).catch(err => {
	console.error(`Необработанная серверная ошибка:`);
	console.error(err);
});