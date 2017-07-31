
import EndPoint from './EndPoint';

export interface IResourceConfig {
	name?: string;
	description?: string;
}

/**
 * Ресурс это группа конечных точек.
 */
export default class Resource {
	
	name: string;
	
	get path(): string {
		return `/${this.name}`;
	}
	
	get isAnonymous(): boolean {
		return !this.name;
	}
	
	description: string;
	
	endPoints: EndPoint[] = [];
	
	constructor(config?: IResourceConfig) {
		if (config) {
			if ('name' in config) this.name = config.name;
			if ('description' in config) this.description = config.description;
		}
	}
	
}