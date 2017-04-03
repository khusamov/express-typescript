
import * as Express from 'express';

export default class PageNotFoundError extends Error {
    
    constructor(req: Express.Request) {
        super();
        this.message = `Страница ${req.path} не найдена.`;
    }
    
}