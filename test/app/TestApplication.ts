
import { Application } from '../../index';
import HomeController from './controllers/HomeController';


export default class TestApplication extends Application {
    
    init() {
        
        this.get('/', new HomeController);
        
        this.get('/page1', function (req, res) {
        	res.send('This is Page1.');
        });
        
        
        
    }
    
}