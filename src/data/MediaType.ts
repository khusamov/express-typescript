
/**
 * Each Media Type Object provides schema and examples for the media type identified by its key.
 * https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.0.md#mediaTypeObject
 */
export default class MediaType {
    
    /**
     * Список типов см. https://goo.gl/CTdLDP
     */
    contentType: string;
    
    /**
     * The schema defining the type used for the request body.
     */
    schema: Schema;
    
    /**
     * A map between a property name and its encoding information. The key, being the property name, 
     * MUST exist in the schema as a property. The encoding object SHALL only apply to requestBody 
     * objects when the media type is multipart or application/x-www-form-urlencoded.
     */
    encoding: {
        [propertyName: string]: Encoding // http://typescript-lang.ru/docs/Interfaces.html
    };
    
    /**
     * 
     */
    examples: {
        [exampleName: string]: Example
    };
    
}