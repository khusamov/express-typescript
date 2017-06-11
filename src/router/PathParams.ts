
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