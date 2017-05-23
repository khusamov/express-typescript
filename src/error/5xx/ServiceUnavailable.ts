
import * as Express from 'express';
import HttpException from '../HttpException';

/**
 * 503 Service Unavailable — сервер временно не имеет возможности обрабатывать 
 * запросы по техническим причинам (обслуживание, перегрузка и прочее). 
 * В поле Retry-After заголовка сервер может указать время, через которое 
 * клиенту рекомендуется повторить запрос. Хотя во время перегрузки очевидным 
 * кажется сразу разрывать соединение, эффективней может оказаться установка 
 * большого значения поля Retry-After для уменьшения частоты избыточных запросов. 
 * Появился в HTTP/1.0.
 */
export default class ServiceUnavailable extends HttpException {
    
    status: number = 503;
    
}