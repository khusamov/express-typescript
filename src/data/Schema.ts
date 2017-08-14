
import Ajv from 'ajv';

/**
 * 
 * 
 * 
 * Ключевые слова, которые добавлены шваггером в Json Schema
 * https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.0.md#fixed-fields-20
 * Обязательно добавить:
 * nullable
 * discriminator
 * Под вопросом:
 * example
 * deprecated
 * Остальные вряд ли понадобятся: readOnly, writeOnly, xml, externalDocs
 * 
 * Добавлять ключевые слова в Ajv можно будет при помощи:
 * http://epoberezkin.github.io/ajv/custom.html
 * https://github.com/epoberezkin/ajv/blob/master/CUSTOM.md
 * 
 */

export default class Schema {
    
    private ajv = new Ajv();
    
    /**
     * https://spacetelescope.github.io/understanding-json-schema/index.html
     * http://json-schema.org/
     * https://tools.ietf.org/html/draft-wright-json-schema-00
     * https://tools.ietf.org/html/draft-wright-json-schema-validation-00
     */
    jsonSchema: any;
    
    validate(data) {
        return this.ajv.validate(this.jsonSchema, data);
    };
    
}