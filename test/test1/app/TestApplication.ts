
import * as Express from 'express';
import { Application } from '../../../index';
import HomeController from './controllers/HomeController';
import TestRouter from './testRouter/TestRouter';

export default class TestApplication extends Application {
    
    init() {
        this.get('/', new HomeController); 
        this.use('/test-router', new TestRouter);
    }
    
}
