
import HttpStatus from '../HttpStatus';

/**
 * 400 Bad Request — сервер обнаружил в запросе клиента синтаксическую ошибку. 
 * Появился в HTTP/1.0.
 */
export default class BadRequestStatus extends HttpStatus {
    
    code: number = 400;
    
}