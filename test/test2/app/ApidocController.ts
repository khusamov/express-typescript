
import { Controller } from 'khusamov-express-typescript';

export default class ApidocController extends Controller {
	
	handler() {
		this.view.renderer.template = 'apidoc';
		return {
			apiEndPointList: this.application.api.map(endPoint => ({
				method: endPoint.method.toUpperCase(),
				path: endPoint.path.fullPath.asString,
				controller: endPoint.handlers.map(handler => handler.name).join(', ')
			}))
		};
	}
	
}