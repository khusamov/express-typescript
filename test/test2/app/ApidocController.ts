
import { Controller } from 'khusamov-express-typescript';

export default class ApidocController extends Controller {
	
	handler(): any {
		this.view.renderer.template = 'apidoc';
		
		//console.log(this.application.resources.length)
		
		
		return {
			resources: this.application.resources
			// apiEndPointList: this.application.api.map(endPoint => ({
			// 	method: endPoint.method.toUpperCase(),
			// 	path: endPoint.path.fullPath.asString,
			// 	controller: endPoint.handlers.map(handler => handler.name).join(', ')
			// }))
		};
	}
	
}