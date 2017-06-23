
import * as Http from 'http';

/**
 * Код состояния HTTP (англ. HTTP status code) — часть первой строки ответа сервера при запросах по протоколу HTTP. 
 * Он представляет собой целое число из трёх десятичных цифр. Первая цифра указывает на класс состояния.
 * 
 * https://goo.gl/ggyPT9
 */
export default class HttpStatus {
	
	code: number;
	
	get reasonPhrase(): string {
		return Http.STATUS_CODES[this.code];
	};
	
	constructor() {
		
	}
	
	toString(): string {
		return `HTTP Status ${this.code} ${this.reasonPhrase}`;
	}
	
	toJson(): any {
		return {
			code: this.code,
			reasonPhrase: this.reasonPhrase
		};
	}
	
}