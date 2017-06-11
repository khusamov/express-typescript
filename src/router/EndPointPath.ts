
import * as _ from 'lodash';

import EndPoint from './EndPoint';
import PathParams from '../router/PathParams';

export interface IValueAsString {
	asString: string;
}

export default class EndPointPath {
	
	static removeEndSlash(path: string): string {
		return path.length > 1 && path[path.length - 1] == '/' ? path.slice(0, -1) : path;
	}
	
	static pathParamRegExpAsString(pathParamRegExp: PathParams) {
		return `/RegExp(${pathParamRegExp.toString()})`;
	}
	
	static pathParamArrayAsString(pathParamArray: PathParams) {
		return `/Array(${(pathParamArray as (string | RegExp)[]).map(item => _.isRegExp(item) ? item.toString() : item).join(', ')})`;
	}
	
	static pathValueAsString(path: PathParams): string {
		let result: string = path as string;
		if (_.isRegExp(path)) {
			result = this.pathParamRegExpAsString(path);
		} else if (_.isArray(path)) {
			result = this.pathParamArrayAsString(path);
		}
		return result;
	}
	
	value: PathParams;
	
	get valueAsString(): string {
		return EndPointPath.pathValueAsString(this.value);
	}
	
	get parentPath(): EndPointPath {
		return this.endPoint.parent.path;
	}
	
	get parentFullPath(): EndPointPath[] {
		return this.endPoint.ancestors.map(ancestor => ancestor.path).reverse();
	}
	
	get fullPath(): EndPointPath[] & IValueAsString {
		const fullPath = this.parentFullPath.concat(this);
		(fullPath as EndPointPath[] & IValueAsString).asString = EndPointPath.removeEndSlash(fullPath.map(path => path.valueAsString).join(''));
		return fullPath as EndPointPath[] & IValueAsString;
	}
	
	constructor(path: PathParams, private endPoint: EndPoint) {
		this.value = path;
	}
	
}