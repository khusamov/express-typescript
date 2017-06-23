
import HttpStatus from '../HttpStatus';

/**
 * 501 Not Implemented — сервер не поддерживает возможностей, необходимых 
 * для обработки запроса. Типичный ответ для случаев, когда сервер не понимает 
 * указанный в запросе метод. Если же метод серверу известен, но он не применим 
 * к данному ресурсу, то нужно вернуть ответ 405. 
 * Появился в HTTP/1.0.
 */
export default class NotImplementedStatus extends HttpStatus {
    
    code: number = 501;
    
}