
import * as Express from 'express';
import Request from '../http/Request';
import Response from '../http/Response';

import NotAcceptableError from '../http/error/NotAcceptableError';

import ViewModel from './ViewModel';
import RenderEngineNotSpecifiedError from './error/RenderEngineNotSpecifiedError';
import RendererError from './error/RendererError';

export default class Renderer {
	
	template: string = 'index';
	
	render(res: Response, viewModel: ViewModel) {
		try {
			res.format({
				json: none => res.json(viewModel.toJson()),
				html: none => res.render(this.template, viewModel.toJson()),
				default: none => { throw new NotAcceptableError; }
			});
		} catch (err) {
			this.onRenderError(err);
		}
	}
	
	protected onRenderError(err: Error) {
		let rendererError = err;
		if (!(err instanceof NotAcceptableError)) {
			if (err.message == 'No default engine was specified and no extension was provided.') {
				rendererError = new RenderEngineNotSpecifiedError;
			} else {
				rendererError = new RendererError;
			}
			rendererError.message = err.message;
		}
		throw rendererError;
	}
	
}