
import { Controller } from '../../../../../../index';

export default class HomeController extends Controller {
	
	protected handler(): string {
		return 'Привет из TestRouter2/HomeController!';
	}
	
}