
import * as Express from 'express';
import Controller from './Controller';
import Response from '../http/Response';
import NotFoundStatus from '../http/status/4xxClientError/NotFoundStatus';

export default class NotFoundController extends Controller {
	
	protected initController() {
		this.register(new Response({
			name: 'notFound',
			status: new NotFoundStatus,
			description: 'Страница или ресурс не найден.'
		}));
	}
	
	protected handler(): ViewModel {
		return new ViewModel({
			response: 'notFound',
			message: `Страница или ресурс '${this.request.path}' не найден.`
		});
	}
	
}