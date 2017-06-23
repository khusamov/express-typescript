
import HttpStatus from '../HttpStatus';

/**
 * 301 Moved Permanently — запрошенный документ был окончательно перенесен 
 * на новый URI, указанный в поле Location заголовка. Некоторые клиенты 
 * некорректно ведут себя при обработке данного кода. 
 * Появился в HTTP/1.0.
 */
export default class MovedPermanentlyStatus extends HttpStatus {
    
    code: number = 301;
    
}