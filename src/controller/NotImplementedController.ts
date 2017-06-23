
import * as Express from 'express';
import Controller from './Controller';
import NotImplementedError from '../http/error/NotImplementedError';

export default class NotImplementedController extends Controller {
	
	protected handler(): NotImplementedError {
		return new NotImplementedError(this.request);
	}
	
}