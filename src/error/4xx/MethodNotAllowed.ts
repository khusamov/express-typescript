
import * as Express from 'express';
import HttpException from '../HttpException';

/**
 * 405 Method Not Allowed — указанный клиентом метод нельзя применить 
 * к текущему ресурсу. В ответе сервер должен указать доступные методы 
 * в заголовке Allow, разделив их запятой. Эту ошибку сервер должен возвращать, 
 * если метод ему известен, но он не применим именно к указанному в запросе ресурсу, 
 * если же указанный метод не применим на всём сервере, то клиенту нужно 
 * вернуть код 501 (Not Implemented). 
 * Появился в HTTP/1.1.
 */
export default class MethodNotAllowed extends HttpException {
    
    status: number = 405;
    
}