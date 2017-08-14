
export interface IParameter extends AbstractParameter {
    in: string;
}

/**
 * An object to hold parameters to be reused across operations. Parameter definitions can be referenced to the ones defined here.
 * This does not define global operation parameters.
 * https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.0.md#parameterObject
 */
export default class Parameter extends AbstractParameter {
    
    /**
     * Required. The location of the parameter. 
     * Possible values are "query", "header", "path" or "cookie".
     */
    in: string;
    
}