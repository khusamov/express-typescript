
import * as Express from 'express';
import Request from '../http/Request';
import Response from '../http/Response';

import ViewModel from './ViewModel';
import Renderer from './Renderer';

export default class View {
    
    private _renderer: Renderer;
    
    get renderer(): Renderer {
        return this._renderer ? this._renderer : this._renderer = new Renderer;
    }
    
    set renderer(renderer: Renderer) {
        this._renderer = renderer;
    }
    
    constructor() {}
    
    render(res: Response, viewModel: ViewModel) {
        this.renderer.render(res, viewModel);
    }
    
}