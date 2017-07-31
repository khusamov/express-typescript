
import { 
	Router, 
	EndPointParameter, 
	EndPointResponse, 
	OkHttpStatus,
	BadRequestHttpStatus 
} from 'khusamov-express-typescript';

import SelectController from './controller/SelectController';
import InsertController from './controller/InsertController';
import UpdateController from './controller/UpdateController';
import DeleteController from './controller/DeleteController';

export default class PetRouter extends Router {
	
	initRouter() {
		
		this.createEndPoint({
			method: 'get',
			path: '/',
			description: 'Получить список питомцев',
			handlers: [new SelectController]
		});
		
		this.createEndPoint({
			method: 'post',
			path: '/',
			description: 'Добавить питомца',
			handlers: [new InsertController],
			parameters: [new EndPointParameter({
				name: 'pet',
				in: 'body'
			})],
			responses: [new EndPointResponse({
				name: 'ok',
				status: new OkHttpStatus,
				description: 'Питомец добавлен'
			}), new EndPointParameter({
				name: 'badRequest',
				status: new BadRequestHttpStatus,
				description: 'Неправильный запрос'
			})]
		});
		
		this.createEndPoint({
			method: 'put',
			path: '/:id',
			description: 'Обновить данные питомца',
			handlers: [new UpdateController]
		});
		
		this.createEndPoint({
			method: 'delete',
			path: '/:id',
			description: 'Удалить питомца',
			handlers: [new DeleteController]
		});
		
		//this.get('/', new SelectController);
		// this.post('/', new InsertController);
		// this.put('/:id', new UpdateController);
		// this.delete('/:id', new DeleteController);
	}
	
	
	
}