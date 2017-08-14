
export interface IAbstractParameter {
    name: string;
    type?: string;
    schema?: any;
    description?: string;
    required?: boolean;
    default?: any;
}

/**
 * An object to hold parameters to be reused across operations. Parameter definitions can be referenced to the ones defined here.
 * This does not define global operation parameters.
 * https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.0.md#parameterObject
 */
export default class AbstractParameter {
    
    /**
     * Required.
     * 
     * The name of the parameter. Parameter names are case sensitive.
     * If in is "path", the name field MUST correspond to the associated path segment from the path field in the Paths Object. 
     * If in is "header" and the name field is "Accept", "Content-Type" or "Authorization", the parameter definition SHALL be ignored.
     * For all other cases, the name corresponds to the parameter name used by the in property.
     * 
     * Если in==path, то name должно содержать имя, совпадающее с сегментом пути.
     * Например, если path = /user/{id}, то name должно быть равно id.
     */
    name: string;
    
    /**
     * The schema defining the type used for the parameter.
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
     * Sets the ability to pass empty-valued parameters. This is valid only for query parameters 
     * and allows sending a parameter with an empty value. Default value is false. If style is used, 
     * and if behavior is n/a (cannot be serialized), the value of allowEmptyValue SHALL be ignored.
     */
    allowEmptyValue: boolean = false;
    
    /**
     * Specifies that a parameter is deprecated and SHOULD be transitioned out of usage.
     */
    deprecated: boolean = false;
    
    /**
     * Массив ассоциаций: MIME-тип и пример под него.
     * Список типов см. https://goo.gl/CTdLDP
     */
    examples: {
        [mediaType: string]: Example
    };
    
    /**
     * Значение по умолчанию.
     */
    default: any;
    
    /**
     * For more complex scenarios, the content property can define the media type and schema of the parameter. 
     * A parameter MUST contain either a schema property, or a content property, but not both. 
     * When example or examples are provided in conjunction with the schema object, 
     * the example MUST follow the prescribed serialization strategy for the parameter.
     * 
     * A map containing the representations for the parameter. 
     * The key is the media type and the value describes it. The map MUST only contain one entry.
     */
    content: MediaType[];
    
    constructor(config: IParameterConfig) {
        this.name = config.name;
        this.in = config.in;
        if ('description' in config) this.description = config.description;
        if ('type' in config) this.type = config.type;
        if ('required' in config) this.required = config.required;
        if ('schema' in config) this.schema = config.schema;
    }
    
}