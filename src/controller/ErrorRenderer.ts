
import * as Express from 'express';
import * as JsonMakeHtml from 'json-make-html';

import Request from '../http/Request';
import Response from '../http/Response';
import Renderer from '../view/Renderer';
import ViewModel from '../view/ViewModel';

/**
 * Аварийный отрисовщик результата обработки запроса.
 */
export default class ErrorRenderer extends Renderer {
	
	template: string = 'error';
	
	render(res: Response, viewModel: ViewModel) {
		try {
			res.format({
				json: none => {
					res.json(viewModel.toJson());
				},
				html: none => {
					res.render(this.template, viewModel.toJson());
				},
				default: none => {
					res.json(viewModel.toJson());
				}
			});
		} catch (err) {
			try {
				//res.json(viewModel.toJson());
				let title = 'Ошибка';
				let json = viewModel.toJson();
				let body = JsonMakeHtml.make(json);
				res.send(`<html><head><title>${title}</title></head><body>${body}</body></html>`);
			} catch (err) {
				this.onRenderError(err);
			}
		}
	}
	
}