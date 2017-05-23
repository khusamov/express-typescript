
import * as Express from 'express';
import HttpException from '../HttpException';

/**
 * 501 Not Implemented — сервер не поддерживает возможностей, необходимых 
 * для обработки запроса. Типичный ответ для случаев, когда сервер не понимает 
 * указанный в запросе метод. Если же метод серверу известен, но он не применим 
 * к данному ресурсу, то нужно вернуть ответ 405. 
 * Появился в HTTP/1.0.
 */
export default class NotImplemented extends HttpException {
    
    status: number = 501;
    
    constructor(req: Express.Request) {
        super(`Метод '${req.method}' для запрошенного ресурса не реализован.`);
    }
    
}