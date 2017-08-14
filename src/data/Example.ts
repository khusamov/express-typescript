
/**
 * https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.0.md#exampleObject
 */
export default class Example {
    
    /**
     * Short description for the example.
     */
    summary: string;
    
    /**
     * Long description for the example.
     */
    description: string;
    
    /**
     * Embedded literal example. The value field and externalValue field are mutually exclusive. 
     * To represent examples of media types that cannot naturally represented in JSON or YAML, 
     * use a string value to contain the example, escaping where necessary.
     */
    value: any;
    
    /**
     * A URL that points to the literal example. This provides the capability to reference 
     * examples that cannot easily be included in JSON or YAML documents. 
     * The value field and externalValue field are mutually exclusive.
     */
    externalValue: string;
    
}