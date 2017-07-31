
import * as Express from 'express';
import HttpStatus from './status/HttpStatus';

export interface IResponseConfig {
	status: HttpStatus;
	schema?: any;
	description?: string;
	headers?: any[];
	examples?: any[];
}

/**
 * An object to hold responses to be reused across operations. Response definitions can be referenced to the ones defined here.
 * This does not define global operation responses.
 * https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#responsesDefinitionsObject
 */
export default class Response {
	
	name: string;
	
	expressResponse: Express.Response;
	
	status: HttpStatus;
	
	/**
	 * Required. A short description of the response. GFM syntax can be used for rich text representation.
	 */
	description?: string;
	
	/**
	 * A definition of the response structure. It can be a primitive, an array or an object. 
	 * If this field does not exist, it means no content is returned as part of the response. 
	 * As an extension to the Schema Object, its root type value may also be "file". 
	 * This SHOULD be accompanied by a relevant produces mime-type.
	 */
	schema?: any;
	
	/**
	 * A list of headers that are sent with the response.
	 */
	headers?: any[];
	
	/**
	 * An example of the response message.
	 */
	examples?: any[];
	
	constructor(config: IResponseConfig) {
		this.status = config.status;
		if ('description' in config) this.description = config.description;
		if ('schema' in config) this.schema = config.schema;
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