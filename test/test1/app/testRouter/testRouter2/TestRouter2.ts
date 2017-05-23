
import * as Express from 'express';
import { Router } from '../../../../../index';
import HomeController from './controllers/HomeController';

export default class TestRouter2 extends Router {
    
    init() {
        this.get('/', new HomeController);
    }
    
}
