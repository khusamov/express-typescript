
import NotAcceptableStatus from '../status/4xxClientError/NotAcceptableStatus';
import HttpError from './HttpError';

export default class NotAcceptableError extends HttpError {
    
    constructor() {
        super(new NotAcceptableStatus);
    }
    
}