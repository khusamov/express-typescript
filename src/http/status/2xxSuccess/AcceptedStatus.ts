
import HttpStatus from '../HttpStatus';

/**
 * 202 Accepted — запрос был принят на обработку, но она не завершена. 
 * Клиенту не обязательно дожидаться окончательной передачи сообщения, 
 * так как может быть начат очень долгий процесс. 
 * Появился в HTTP/1.0.
 */
export default class AcceptedStatus extends HttpStatus {
    
    code: number = 202;
    
}