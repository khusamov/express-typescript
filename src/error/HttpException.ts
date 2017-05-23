
import * as Express from 'express';
import * as Http from 'http';

/**
 * Код состояния HTTP (англ. HTTP status code) — часть первой строки ответа сервера при запросах по протоколу HTTP. 
 * Он представляет собой целое число из трёх десятичных цифр. Первая цифра указывает на класс состояния.
 * 
 * https://goo.gl/ggyPT9
 */
export default class HttpException extends Error {
    
    status: number;
    
    previousError: Error;
    
    static createFrom(err: Error): Error {
        let result = new this(err.message);
        return result;
    }
    
    get reasonPhrase(): string {
        return Http.STATUS_CODES[this.status];
    };
    
    get message() {
        return `${this.status}: ${super.message || this.reasonPhrase}`;
    }
    
    constructor(message?: string, previousError?: Error) {
        super(message);
        this.previousError = previousError;
    }
    
    toString(): string {
        return `HTTP Status Code: ${this.status}. HTTP Reason Phrase: ${this.reasonPhrase}. ${super.toString()}`;
    }
    
    toJson(): any {
        return {
            message: this.message,
            status: this.status,
            reasonPhrase: this.reasonPhrase,
            previousError: this.previousError instanceof HttpException ? this.previousError.toJson() : this.previousError
        };
    }
    
}