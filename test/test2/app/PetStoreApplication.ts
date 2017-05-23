
import * as Express from 'express';
import { Application } from 'khusamov-express-typescript';
import PetRouter from './pet/PetRouter';

export default class PetStoreApplication extends Application {
    
    init() {
        this.use('/pet', new PetRouter);
    }
    
}
