
import * as Express from 'express';
import HttpException from '../HttpException';

/**
 * 500 Internal Server Error — любая внутренняя ошибка сервера, 
 * которая не входит в рамки остальных ошибок класса. 
 * Появился в HTTP/1.0.
 */
export default class InternalServerError extends HttpException {
    
    status: number = 500;
    
}