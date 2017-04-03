
import * as _ from 'lodash';

export default class Config {
	
	private _config: any;
	
	protected get _defaults(): any { return {}; }
	
	constructor(config: any) {
		config = _.merge({}, this._defaults, config);
		for (let key in config) {
			if (_.isPlainObject(config[key])) {
				config[key] = new Config(config[key]);
			}
		}
		this._config = config;
	}
	
	/**
	 * Получить значение параметра конфига.
	 * Например param1.param2.param3
	 */
	get(name: string): any {
		let value = this._config[name.split('.')[0]];
		if (value instanceof Config) {
			let names = name.split('.');
			names.shift();
			return value.get(names.join('.'));
		} else {
			return value;
		}
	}
	
}