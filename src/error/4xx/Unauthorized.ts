
import * as Express from 'express';
import HttpException from '../HttpException';

/**
 * 401 Unauthorized — для доступа к запрашиваемому ресурсу требуется аутентификация.
 * В заголовке ответ должен содержать поле WWW-Authenticate с перечнем условий аутентификации. 
 * Клиент может повторить запрос, включив в заголовок сообщения поле Authorization 
 * с требуемыми для аутентификации данными.
 */
export default class Unauthorized extends HttpException {
    
    status: number = 401;
    
}