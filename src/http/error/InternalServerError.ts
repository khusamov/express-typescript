
import InternalServerErrorStatus from '../status/5xxServerError/InternalServerErrorStatus';
import HttpError from './HttpError';

export default class InternalServerError extends HttpError {
    
    constructor() {
        super(new InternalServerErrorStatus);
    }
    
}