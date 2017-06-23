
import * as Express from 'express';
import * as Http from 'http';
import HttpStatus from '../status/HttpStatus';

export interface IHttpErrorConfig {
	status: HttpStatus;
	message?: string;
	previousError?: Error;
}

export default class HttpError extends Error {
	
	static getReasonPhraseByStatus(status: HttpStatus): string {
		return Http.STATUS_CODES[status.code];
	}
	
	status: HttpStatus;
	
	previousError: Error;

	get reasonPhrase(): string {
		return HttpError.getReasonPhraseByStatus(this.status);
	};
	
	constructor(configOrStatus: IHttpErrorConfig | HttpStatus) {
		let status, message, previousError;
		if (configOrStatus instanceof HttpStatus) {
			status = configOrStatus as HttpStatus;
			message = `${status.code}: ${HttpError.getReasonPhraseByStatus(status)}`;
		} else {
			({ status, message, previousError } = configOrStatus as IHttpErrorConfig);
		}
		super(message);
		this.status = status;
		this.previousError = previousError;
	}
	
	toString(): string {
		return `${this.status.toString()} ${super.toString()}`;
	}
	
	toJson(): any {
		return {
			message: this.message,
			statusCode: this.status.toJson(),
			previousError: this.previousError instanceof HttpError ? this.previousError.toJson() : this.previousError
		};
	}
	
}