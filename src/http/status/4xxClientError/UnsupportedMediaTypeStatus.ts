
import HttpStatus from '../HttpStatus';

/**
 * 415 Unsupported Media Type — по каким-то причинам сервер отказывается работать 
 * с указанным типом данных при данном методе. 
 * Появился в HTTP/1.1.
 */
export default class UnsupportedMediaTypeStatus extends HttpStatus {
    
    code: number = 415;
    
}