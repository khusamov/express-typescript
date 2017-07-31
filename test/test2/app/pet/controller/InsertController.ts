
import { 
    Controller, 
    ControllerParameter, 
    ControllerResponse,
    HttpOkStatus,
    HttpInternalServerErrorStatus
} from 'khusamov-express-typescript';

export default class InsertController extends Controller {
    
    description = 'Add a new pet to the store.';
    
    parameters: ControllerParameter[] = [new ControllerParameter({
        name: 'pet',
        in: 'body'
    })];
    
    responses: ControllerResponse[] = [new ControllerResponse({
        status: new HttpOkStatus,
        description: 'Питомец успешно добавлен.'
    }), new ControllerResponse({
        status: new HttpInternalServerErrorStatus,
        description: 'Ошибка на сервере.'
    })];
    
    handler() {
        // this.response.status = new HttpOkStatus;
    }
    
}