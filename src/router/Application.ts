
import * as _ from 'lodash';
import * as Express from 'express';

import Router from './Router';
//import EndPoint from './EndPoint';
import { default as Resource, IResourceConfig } from './Resource';
import ErrorController from '../controller/ErrorController';
import NotFoundController from '../controller/NotFoundController';
import NotImplementedRouterPlugin from '../handler/plugin/NotImplementedRouterPlugin';

export default class Application extends Router {
	
	private endPointsByResourcesPlaced: boolean = false;
	
	resources: Resource[];
	
	protected _expressHandler: Express.Application;
	
    get expressHandler(): Express.Application {
        return this._expressHandler ? this._expressHandler : this._expressHandler = Express();
    }
	
	protected initRouter() {
		this.resources = [];
		this.set('x-powered-by', false);
		this.registerPlugin(new NotImplementedRouterPlugin);
		
		// Этот ресурс будет хранить конечные точки, которые не вошли ни в один из именнованных (имеющих path) ресурсов.
		this.resources.push(new Resource); 
		//this.resources = this.resources.concat(this.createResources());
		
		this.initApplication();
		
		this.use(new NotFoundController);
		this.use(new ErrorController);
		
		this.placeEndPointsByResources();
		
	}
	
	protected createResource(config?: IResourceConfig): this {
		this.resources = this.resources.concat(new Resource(config));
		return this;
	}
	
	//protected createResources(): Resource[] { return []; }
	
	protected initApplication() {}
	
	set(setting: string, val: any): this {
		this.expressHandler.set(setting, val);
		return this;
	}
	
	/**
	 * Размещение конечных точек по ресурсам.
	 */
	protected placeEndPointsByResources() {
		this.getEndPoints().forEach(endPoint => {
			const endPointRouters = endPoint.handlers.filter(handler => handler instanceof Router);
			const hasRouters: boolean = !!endPointRouters.length;
			if (endPoint.method != 'use' || endPoint.method == 'use' && hasRouters) {
				let endPoints;
				if (hasRouters) {
					endPoints = endPointRouters.reduce((result, router: Router) => {
						return result.concat(router.api);
					}, []);
				} else {
					endPoints = [endPoint];
				}
				const anonymousResource = this.resources.find(resource => resource.isAnonymous);
				this.resources.filter(resource => !resource.isAnonymous).forEach(resource => {
					endPoints.forEach(endPoint => {
						const path = endPoint.path;
						// Сравнение с полными путями конечных точек (все комбинации путей)
						let isPathMatch: boolean = false;
						path.fullPathCombinationsAsStringArray.forEach(fullPath => {
							if (fullPath.indexOf(resource.path) == 0) isPathMatch = true;
						});
						if (isPathMatch) {
							resource.endPoints.push(endPoint);
						} else {
							anonymousResource.endPoints.push(endPoint);
						}
					});
				});
			}
		});
		this.endPointsByResourcesPlaced = true;
	}
	
	protected registerHandlers(...args: any[]): this {
		if (this.endPointsByResourcesPlaced) throw new Error('Регистрировать обработчики нельзя, так как конечные точки уже размещены по ресурсам.');
		return super.registerHandlers.apply(this, arguments);
	}
	
	
	// get(...args: any[]) {
	// 	if (arguments.length == 1) {
	// 		this._app.get.apply(this, args);
	// 		return this;
	// 	}
	// 	return super.get.apply(this, args);
	// }
	
	// set(...args: any[]) {
	// 	return this._app.set.apply(arguments);
	// }
	
	// listen(...args: any[]) {
	// 	return this._app.listen.apply(this._app, arguments);
	// }
	
}