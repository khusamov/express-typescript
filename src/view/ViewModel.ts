
import * as _ from 'lodash';
import HttpStatus from '../http/status/HttpStatus';

export interface IRedirect {
	status?: HttpStatus;
	url: string;
}

export default class ViewModel {
	
	private _data;
	
	redirect: IRedirect;
	
	response: string;
	
	template: string;
	
	get data() {
		return this._data;
	}
	
	set data(data) {
		this._data = data;
		// Содержимое полей response и template переносим в модель и удаляем из данных.
		['redirect', 'response', 'template'].forEach(prop => {
			if (prop in this._data) {
				this[prop] = this._data[prop];
				delete this._data[prop];
			}
		});
	}
	
	constructor(data?: any) {
		this.data = data;
	}
	
	toJson(): any {
		return "toJson" in this.data ? this.data.toJson() : this.data;
	}
	
}