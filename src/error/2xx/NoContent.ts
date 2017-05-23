
import * as Express from 'express';
import HttpException from '../HttpException';

/**
 * 204 No Content — сервер успешно обработал запрос, но в ответе были переданы 
 * только заголовки без тела сообщения. Клиент не должен обновлять содержимое 
 * документа, но может применить к нему полученные метаданные. 
 * Появился в HTTP/1.0.
 */
export default class NoContent extends HttpException {
    
    status: number = 204;
    
}