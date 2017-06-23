
import * as Express from 'express';
import Controller from './Controller';
import NotFoundError from '../http/error/NotFoundError';

export default class NotFoundController extends Controller {
	
	protected handler(): NotFoundError {
		return new NotFoundError(this.request);
	}
	
}