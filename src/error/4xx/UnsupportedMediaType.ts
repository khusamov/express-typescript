
import * as Express from 'express';
import HttpException from '../HttpException';

/**
 * 415 Unsupported Media Type — по каким-то причинам сервер отказывается работать 
 * с указанным типом данных при данном методе. 
 * Появился в HTTP/1.1.
 */
export default class UnsupportedMediaType extends HttpException {
    
    status: number = 415;
    
}