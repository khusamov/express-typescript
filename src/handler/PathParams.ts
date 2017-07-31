
import * as _ from 'lodash';

export type PathParams = string | RegExp | (string | RegExp)[];

export default PathParams;

export function isPathParams(value: any): value is PathParams {
	return (
		typeof value == 'string' || value instanceof RegExp || (
			_.isArray(value) && (
				value.length === 0 || 
				typeof value[0] == 'string' || 
				value[0] instanceof RegExp
			)
		)
	);
}

export function eqPathParams(path1: PathParams, path2: PathParams): boolean {
	return pathParamToString(path1) == pathParamToString(path2);
}

function pathParamToString(path: PathParams): string {
	if (_.isString(path)) return path as string;
	else if (_.isRegExp(path)) return (path as RegExp).source;
	else if (_.isArray(path)) return (path as (string | RegExp)[]).map(path => pathParamToString(path)).join('');
}