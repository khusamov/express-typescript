
//import { Controller } from '../../../../../index';
import { Controller } from 'khusamov-express-typescript';


export default class HomeController extends Controller {
	
	protected handler(): string {
		return 'Привет из TestRouter/HomeController!';
	}
	
}