
import * as Express from 'express';

import HttpStatus from './status/HttpStatus';

export default class Response {
    
    private _status: HttpStatus;
    
    get status() {
        return this._status;
    }
    
    set status(status: HttpStatus) {
        this._status = status;
        this.expressResponse.status(status.code);
    }
    
    // status(status: HttpStatus): this {
    //     this._status = status;
    //     this.expressResponse.status(status.code);
    //     return this;
    // }

    constructor(public expressResponse: Express.Response) {
        
    }
    
    send(...args: any[]): this {
        this.expressResponse.send.apply(this.expressResponse, arguments);
        return this;
    }
    
    json(...args: any[]): this {
        this.expressResponse.json.apply(this.expressResponse, arguments);
        return this;
    }
    
    render(...args: any[]): void {
        this.expressResponse.render.apply(this.expressResponse, arguments);
    }
    
    redirect(...args: any[]): void {
        this.expressResponse.redirect.apply(this.expressResponse, arguments);
    }
    
    format(...args: any[]): this {
        this.expressResponse.format.apply(this.expressResponse, arguments);
        return this;
    }
    
}