
import * as Express from 'express';
import ViewModel from './ViewModel';
import NotAcceptable from '../error/4xx/NotAcceptable';
import RenderEngineNotSpecified from './error/RenderEngineNotSpecified';
import RendererError from './error/RendererError';

export default class Renderer {
	
	render(res: Express.Response, viewModel: ViewModel) {
	
		res.format({
			json: none => {
				res.json(viewModel.toJson());
			},
			html: none => {
				
				try {
				
					res.render('index', viewModel.toJson());
					// if (res.app.get('view engine')) {
					// 	res.render('index', viewModel.toJson());
					// } else {
					// 	res.send(viewModel.toJson());
					// }
					
				} catch (err) {
					
					if (err.message == 'No default engine was specified and no extension was provided.') {
						throw RenderEngineNotSpecified.createFrom(err);
					} else {
						throw RendererError.createFrom(err);
					}
					
					
				}
				
			},
			default: none => {
				//res.status(406).send('Not Acceptable.');
				throw new NotAcceptable;
			}
		});
		
		
		
	}
	
}