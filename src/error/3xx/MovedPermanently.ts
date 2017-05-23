
import * as Express from 'express';
import HttpException from '../HttpException';

/**
 * 301 Moved Permanently — запрошенный документ был окончательно перенесен 
 * на новый URI, указанный в поле Location заголовка. Некоторые клиенты 
 * некорректно ведут себя при обработке данного кода. 
 * Появился в HTTP/1.0.
 */
export default class MovedPermanently extends HttpException {
    
    status: number = 301;
    
}