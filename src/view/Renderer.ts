
import * as Express from 'express';
import Request from '../http/Request';
import Response from '../http/Response';

import ViewModel from './ViewModel';
import RenderEngineNotSpecifiedError from './error/RenderEngineNotSpecifiedError';
import NotAcceptableFormatError from './error/NotAcceptableFormatError';
import RendererError from './error/RendererError';

/**
 * Странный класс, который совмещает в себе фунции отрисовки ответа и отправки ответа.
 */
export default class Renderer {
	
	private const engineNotSpecifiedErrorText = 'No default engine was specified and no extension was provided.';
	
	template: string = 'index';
	
	render(response: Response, viewModel: ViewModel) {
		if (viewModel.redirect) {
			if (viewModel.redirect.status) response.status = viewModel.redirect.status;
			response.redirect(viewModel.redirect.url);
		} else {
			try {
				res.format({
					json: none => res.json(viewModel.toJson()),
					html: none => res.render(this.template, viewModel.toJson()),
					default: none => { throw new NotAcceptableFormatError; }
				});
			} catch (err) {
				this.onRenderError(err);
			}
		}
	}
	
	protected onRenderError(err: Error) {
		let rendererError = err;
		if (!(err instanceof NotAcceptableFormatError)) {
			if (err.message == this.engineNotSpecifiedErrorText) {
				rendererError = new RenderEngineNotSpecifiedError;
			} else {
				rendererError = new RendererError;
			}
			rendererError.message = err.message;
		}
		throw rendererError;
	}
	
}