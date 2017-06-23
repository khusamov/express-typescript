
import HttpStatus from '../HttpStatus';

/**
 * 200 OK — успешный запрос. Если клиентом были запрошены какие-либо данные, 
 * то они находятся в заголовке и/или теле сообщения. 
 * Появился в HTTP/1.0.
 */
export default class OkStatus extends HttpStatus {
    
    code: number = 200;
    
}