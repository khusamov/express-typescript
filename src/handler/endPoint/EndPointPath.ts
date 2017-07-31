
import * as _ from 'lodash';

import EndPoint from './EndPoint';
import PathParams from './PathParams';

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
	
	get valueAsArray(): (string | RegExp)[] {
		return (_.isArray(this.value) ? this.value : [this.value]) as (string | RegExp)[];
	}
	
	get parentPath(): EndPointPath {
		return this.endPoint.parent.path;
	}
	
	get parentFullPath(): EndPointPath[] {
		return this.endPoint.ancestors.map(ancestor => ancestor.path).reverse();
	}
	
	get fullPath(): EndPointPath[] {
		return this.parentFullPath.concat(this);
	}
	
	get fullPathAsString(): string {
		return EndPointPath.removeEndSlash(this.fullPath.map(path => path.valueAsString).join(''));
	}
	
	get fullPathCombinations(): (string | RegExp)[][] {
		return this.fullPath.reduce((result: (string | RegExp)[][], endPointPath): (string | RegExp)[][] => {
			if (result.length) {
				return this.arrComb(result, [endPointPath.valueAsArray]) as (string | RegExp)[][];
			} else {
				return [endPointPath.valueAsArray];
			}
		}, []);
	}
	
	get fullPathCombinationsAsStringArray(): string[] {
		return this.fullPathCombinations.map(fullPath => {
			return fullPath.reduce<string>((result, partFullPath) => {
				return result + (_.isRegExp(partFullPath) ? `/RegExp(${partFullPath.toString()})` : partFullPath as string);
			}, '');
		});
	}
	
	constructor(path: PathParams, private endPoint: EndPoint) {
		this.value = path;
	}
	
	/**
	 * Вспомогательная функция для комбинирования элементов двух массивов.
	 */
	private arrComb(arr1: any[], arr2: any[]): any[] {
		const result = [];
		arr1.forEach(item1 => {
			arr2.forEach(item2 => {
				result.push([item1, item2]);
			});
		});
		return result;
	}
	
}