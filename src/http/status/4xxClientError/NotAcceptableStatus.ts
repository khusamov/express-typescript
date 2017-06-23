
import HttpStatus from '../HttpStatus';

/**
 * 406 Not Acceptable — запрошенный URI не может удовлетворить переданным в заголовке 
 * характеристикам. Если метод был не HEAD, то сервер должен вернуть список допустимых 
 * характеристик для данного ресурса. 
 * Появился в HTTP/1.1.
 */
export default class NotAcceptableStatus extends HttpStatus {
    
    code: number = 406;
    
}