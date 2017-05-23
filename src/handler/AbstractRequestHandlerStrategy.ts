


// ВРЕМЕННО ЭТОТ КЛАСС НЕ ИСПОЛЬЗУЕТСЯ


import * as Express from 'express';
import AbstractRequestHandler from './AbstractRequestHandler';

export default class AbstractRequestHandlerStrategy {
	
	public requestHandler: AbstractRequestHandler;
	
	constructor() {}
	
	render(result: any): void {}
	
	
}