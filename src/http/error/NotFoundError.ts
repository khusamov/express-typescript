
import * as _ from 'lodash';
import * as Express from 'express';
import Request from '../../http/Request';
import Response from '../../http/Response';
import NotFoundStatus from '../status/4xxClientError/NotFoundStatus';

import HttpError from './HttpError';

export default class NotFoundError extends HttpError {
    
    constructor(messageOrReq: string | Request) {
        super({
            status: new NotFoundStatus,
            message: _.isString(messageOrReq) ? messageOrReq as string : `Страница или ресурс '${(messageOrReq as Request).path}' не найден.`
        });
    }
    
}