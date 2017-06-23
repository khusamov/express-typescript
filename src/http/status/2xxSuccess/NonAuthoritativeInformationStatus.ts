
import HttpStatus from '../HttpStatus';

/**
 * 203 Non-Authoritative Information — аналогично ответу 200, но в этом случае 
 * передаваемая информация была взята не из первичного источника (резервной копии, 
 * другого сервера и т. д.) и поэтому может быть неактуальной. 
 * Появился в HTTP/1.1.
 */
export default class NonAuthoritativeInformationStatus extends HttpStatus {
    
    code: number = 203;
    
}