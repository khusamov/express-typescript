
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
	
		res.format({
			json: none => {
				res.json(viewModel.toJson());
			},
			html: none => {
				
				try {
				    res.render(this.template, viewModel.toJson());
				} catch (err) {
				    //res.json(viewModel.toJson());
				    
				    
				    let title = 'Ошибка';
				    let json = viewModel.toJson();
				    let body = JsonMakeHtml.make(json);
				    
				    
				    res.send(`<html><head><title>${title}</title></head><body>${body}</body></html>`)
				    
				}
			
				
			
			},
			default: none => {
				res.json(viewModel.toJson());
			}
		});
		
		
		
	}
	
}