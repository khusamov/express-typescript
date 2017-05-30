
import * as Path from 'path';
import * as Express from 'express';
import { Application } from 'khusamov-express-typescript';
import PetRouter from './pet/PetRouter';
import ApidocController from './ApidocController'

export default class PetStoreApplication extends Application {
    
    init() {
        this.set('view engine', 'pug');
        this.set('views', Path.join(__dirname, 'view'));
        this.get('/', new ApidocController);
        this.use('/pet', new PetRouter);
    }
    
}