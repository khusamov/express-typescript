
import * as Express from 'express';

export default class Request {
    
    get path(): string {
        return this.expressRequest.path;
    }
    
    get method(): string {
        return this.expressRequest.method;
    }
    
    get originalUrl(): string {
        return this.expressRequest.originalUrl;
    }
    
    get hostname(): string {
        return this.expressRequest.hostname;
    }
    
    get protocol(): string {
        return this.expressRequest.protocol;
    }
    
    constructor(public expressRequest: Express.Request) {}
    
}