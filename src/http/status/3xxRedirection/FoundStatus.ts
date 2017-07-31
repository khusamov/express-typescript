
import HttpStatus from '../HttpStatus';

/**
 * 302 Found, 302 Moved Temporarily — запрошенный документ временно доступен 
 * по другому URI, указанному в заголовке в поле Location. Этот код может быть 
 * использован, например, при управляемом сервером согласовании содержимого. 
 * Некоторые клиенты некорректно ведут себя при обработке данного кода 
 * Введено в HTTP/1.0.
 */
export default class FoundStatus extends HttpStatus {
    
    code: number = 302;
    
}