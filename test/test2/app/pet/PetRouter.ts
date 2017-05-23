
import { Router } from 'khusamov-express-typescript';
import SelectController from './controller/SelectController';
import InsertController from './controller/InsertController';
import UpdateController from './controller/UpdateController';
import DeleteController from './controller/DeleteController';

export default class PetRouter extends Router {
    
    init() {
        this.get('/', new SelectController);
        this.post('/', new InsertController);
        this.put('/', new UpdateController);
        this.delete('/', new DeleteController);
    }
    
}