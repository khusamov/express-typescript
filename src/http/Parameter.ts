
export interface IParameter {
    name: string;
    in: string;
    type?: string;
    schema?: any;
    description?: string;
    required?: boolean;
    default?: any;
}

/**
 * An object to hold parameters to be reused across operations. Parameter definitions can be referenced to the ones defined here.
 * This does not define global operation parameters.
 * https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#parametersDefinitionsObject
 */
export class Parameter {
    
    /**
     * Required. The name of the parameter. Parameter names are case sensitive.
     * Если in==path, то name должно содержать имя, совпадающее с сегментом пути.
     * Например, если path = /user/{id}, то name должно быть равно id.
     */
    name: string;
    
    /**
     * Required. The location of the parameter. 
     * Possible values are "query", "header", "path", "formData" or "body".
     */
    in: string;
    
    /**
     * If in!=body is any value other than "body": Required. The type of the parameter. 
     * Since the parameter is not located at the request body, it is limited to simple types (that is, not an object). 
     * The value MUST be one of "string", "number", "integer", "boolean", "array" or "file". 
     * If type is "file", the consumes MUST be either "multipart/form-data", "application/x-www-form-urlencoded" 
     * or both and the parameter MUST be in "formData".
     */
    type: string;
    
    /**
     * ПОКА НЕ ИСПОЛЬЗУЕТСЯ
     * If in==body is "body": Required. The schema defining the type used for the body parameter.
     */
    schema: any;
    
    /**
     * A brief description of the parameter. 
     * This could contain examples of use.
     */
    description: string;
    
    /**
     * Determines whether this parameter is mandatory. If the parameter is in "path", 
     * this property is required and its value MUST be true. Otherwise, the property MAY 
     * be included and its default value is false.
     */
    required: boolean = false;
    
    /**
     * Значение по умолчанию.
     */
    default: any;
    
    constructor(config: IParameterConfig) {
        this.name = config.name;
        this.in = config.in;
        if ('description' in config) this.description = config.description;
        if ('type' in config) this.type = config.type;
        if ('required' in config) this.required = config.required;
        if ('schema' in config) this.schema = config.schema;
    }
    
}

export default Parameter;