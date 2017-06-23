
import HttpStatus from '../HttpStatus';

/**
 * 500 Internal Server Error — любая внутренняя ошибка сервера, 
 * которая не входит в рамки остальных ошибок класса. 
 * Появился в HTTP/1.0.
 */
export default class InternalServerErrorStatus extends HttpStatus {
    
    code: number = 500;
    
}