
import { default as PathParams, isPathParams, eqPathParams } from '../handler/PathParams';
import { default as EndPoint, IEndPoint, IFreeEndPoint } from '../handler/endPoint/EndPoint';

import BaseRouter from './BaseRouter';
import Application from './Application';

export default class Router extends BaseRouter {
	
	get application(): Application {
		return this.endPoint.router instanceof Application ? this.endPoint.router : this.endPoint.router.application;
	}
	
	private _endPoints: EndPoint[];
	
	private get endPoints(): EndPoint[] {
		return this._endPoints ? this._endPoints : this._endPoints = [];
	}
	
	get api(): EndPoint[] {
		return this.getEndPoints(true).filter(endPoint => endPoint.method != 'use');
	}
	
	constructor() {
		super();
		this.initRouter();
	}
	
	protected initRouter() {}
	
	protected registerHandlers(method: string, path: PathParams, handlers: RequestHandlers): this {
		
		super.registerHandlers(method, path, handlers);
		
		let endPoint = this.findEndPoint(method, path);
		if (!endPoint) {
			endPoint = new EndPoint({
				path: path,
				method: method,
				router: this
			});
			this.endPoints.push(endPoint);
		}
		endPoint.handlers = endPoint.handlers.concat(_.flatten(handlers));
		_.flatten(handlers).forEach(handler => {
			// Сделано искусственное ограничение. У обработчика не может быть более одного владельца. Хотя в Экспрессе это допускается.
			if (handler.endPoint) throw new Error(`Попытка перезаписи владельца обработчика '${handler.constructor.name}'.`);
			handler.endPoint = endPoint;
		});
		return this;
	}
	
	protected findEndPoint(method: string, path: PathParams): EndPoint {
		return this.endPoints.find(endPoint => {
			return endPoint.method == method && eqPathParams(endPoint.path.value, path);
		});
	}
	
	/**
	 * Метод, предназначенный для получения конечных точек как в виде исходного дерева, так в виде одноуровневого списка.
	 */
	getEndPoints(flatten: boolean = false): EndPoint[] {
		if (flatten) {
			return this.endPoints.reduce((result, endPoint) => {
				const routers: Router[] = endPoint.handlers.reduce((result, handler) => handler instanceof Router ? result.concat(handler) : result, []);
				result = routers.length > 1 ? result.concat(endPoint) : result;
				return result.concat(routers.length ? _.flatten(routers.map(router => router.getEndPoints(true))) : endPoint);
			}, []);
		}
		return this.endPoints;
	}
	
	protected createEndPoint(config: IFreeEndPoint): this {
		// Чтобы избежать двойной регистрации обработчиков удаляем их из конфига,
		// а затем их регистрируем после регистрации конечной точки.
		const handlers = config.handlers || [];
		delete config.handlers;
		
		// Регистрация конечной точки.
		config.router = this;
		const endPoint = new EndPoint(config as IEndPoint);
		this.endPoints.push(endPoint);
		
		// Регистрация обработчиков.
		if (handlers.length) {
			let args = [];
			if (endPoint.path) args.push(endPoint.path.value);
			args = args.concat(handlers);
			this[endPoint.method].apply(this, args);
		}
		
		return this;
	}
	
}