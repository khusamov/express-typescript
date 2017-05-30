
import { Controller } from 'khusamov-express-typescript';

export default class ApidocController extends Controller {
	
	handler() {
		
		//console.log(typeof this.application);
		const endPointList = this.application.endPoints.map(endPoint => `${endPoint.method} ${endPoint.path} (${endPoint.handlers.length})`).join('<br/>');
		//const endPointList = '';
		
		return `Наши конечные точки: <br/>${endPointList}`; 
	}
	
}