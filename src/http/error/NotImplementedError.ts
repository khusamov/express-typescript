
import * as _ from 'lodash';
import * as Express from 'express';
import Request from '../../http/Request';
import Response from '../../http/Response';
import NotImplementedStatus from '../status/5xxServerError/NotImplementedStatus';
import HttpError from './HttpError';

export default class NotImplementedError extends HttpError {
    
    constructor(messageOrReq: string | Request) {
        super({
            status: new NotImplementedStatus,
            message: _.isString(messageOrReq) ? messageOrReq as string : `Метод '${(messageOrReq as Request).method}' для запрошенного ресурса не реализован.`
        });
    }
    
}