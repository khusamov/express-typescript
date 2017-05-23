
import * as Express from 'express';
import { Router } from '../../../../index';
import HomeController from './controllers/HomeController';
import TestRouter2 from './testRouter2/TestRouter2';

export default class TestRouter extends Router {
    
    init() {
        this.get('/', new HomeController);
        this.use('/test-router2', new TestRouter2);
    }
    
}
