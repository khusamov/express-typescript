
import * as Express from 'express';
import HttpException from '../HttpException';

/**
 * 400 Bad Request — сервер обнаружил в запросе клиента синтаксическую ошибку. 
 * Появился в HTTP/1.0.
 */
export default class BadRequest extends HttpException {
    
    status: number = 400;
    
}