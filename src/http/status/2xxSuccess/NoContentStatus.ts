
import HttpStatus from '../HttpStatus';

/**
 * 204 No Content — сервер успешно обработал запрос, но в ответе были переданы 
 * только заголовки без тела сообщения. Клиент не должен обновлять содержимое 
 * документа, но может применить к нему полученные метаданные. 
 * Появился в HTTP/1.0.
 */
export default class NoContentStatus extends HttpStatus {
    
    code: number = 204;
    
}