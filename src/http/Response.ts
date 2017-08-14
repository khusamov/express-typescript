
import * as Express from 'express';
import HttpStatus from './status/HttpStatus';

export interface IResponse {
	name: string;
	status: HttpStatus;
	description?: string;
	headers?: Header[];
	content?: MediaType[];
}

/**
 * An object to hold responses to be reused across operations. Response definitions can be referenced to the ones defined here.
 * This does not define global operation responses.
 * https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#responsesDefinitionsObject
 */
export default class Response {
	
	expressResponse: Express.Response;
	
	name: string;
	
	status: HttpStatus;
	
	/**
	 * Required. A short description of the response. GFM syntax can be used for rich text representation.
	 */
	description: string;

	/**
	 * Maps a header name to its definition. RFC7230 states header names are case insensitive. 
	 * If a response header is defined with the name "Content-Type", it SHALL be ignored.
	 */
	headers: Header[];
	
	/**
	 * A map containing descriptions of potential response payloads. The key is a media type or media type 
	 * range and the value describes it. For responses that match multiple keys, only the most specific 
	 * key is applicable. e.g. text/plain overrides text/*
	 */
	content: MediaType[];
	
	constructor(config: IResponseConfig) {
		this.name = config.name;
		this.status = config.status;
		if ('description' in config) this.description = config.description;
		if ('headers' in config) this.headers = config.headers;
		if ('content' in config) this.content = config.content;
	}
	
	/**
	 * Подготовка перед отправкой ответа.
	 * Сохранение в expressResponse статус, заголовки, куки ответа.
	 */
	private beforeSend() {
		if (!this.expressResponse) throw new Error('Не задан expressResponse.');
		if (!this.status) throw new Error('Не опреден статус ответа.');
		this.expressResponse.status(this.status.code);
	}
	
	send(...args: any[]): this {
		this.beforeSend();
		this.expressResponse.send.apply(this.expressResponse, arguments);
		return this;
	}
	
	json(...args: any[]): this {
		this.beforeSend();
		this.expressResponse.json.apply(this.expressResponse, arguments);
		return this;
	}
	
	render(...args: any[]): void {
		this.beforeSend();
		this.expressResponse.render.apply(this.expressResponse, arguments);
	}
	
	redirect(...args: any[]): void {
		this.beforeSend();
		this.expressResponse.redirect.apply(this.expressResponse, arguments);
	}
	
	format(...args: any[]): this {
		this.beforeSend();
		this.expressResponse.format.apply(this.expressResponse, arguments);
		return this;
	}
	
}