
import * as Path from 'path';
import * as Express from 'express';
import { Application, Resource } from 'khusamov-express-typescript';

import PetRouter from './pet/PetRouter';
import ApidocController from './ApidocController'

export default class PetStoreApplication extends Application {
	
	// createResources(): Resource[] {
	// 	return [new Resource({
	// 		name: 'pet',
	// 		description: 'Everything about your Pets'
	// 	})];
	// }
	
	initApplication() {
		this.set('view engine', 'pug');
		this.set('views', Path.join(__dirname, 'view'));
		
		this.createResource({
			name: 'pet',
			description: 'Everything about your Pets'
		});
		
		this.get('/', new ApidocController);
		
		
		this.use('/pet', new PetRouter);
		
		
		
		
		// this.resource({
		// 	name: 'pet',
		// 	description: 'Everything about your Pets',
		// 	router: new PetRouter
		// })
		
		
	}
	
}