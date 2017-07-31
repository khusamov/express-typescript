
import * as Express from 'express';
import Controller from './Controller';
import NotImplementedError from '../http/status/5xxServerError/NotImplementedStatus';

export default class NotImplementedController extends Controller {
	
	protected initController() {
		this.register(new Response({
			name: 'notImplemented',
			status: new NotImplementedStatus,
			description: 'Метод для запрошенного ресурса не реализован.'
		}));
	}
	
	protected handler(): NotImplementedError {
		return new ViewModel({
			response: 'notImplemented',
			message: `Метод '${(messageOrReq as Request).method}' для запрошенного ресурса не реализован.`
		});
	}
	
}