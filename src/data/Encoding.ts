
/**
 * A single encoding definition applied to a single schema property.
 * https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.0.md#encodingObject
 */
export default class Encoding {
    
    /**
     * The Content-Type for encoding a specific property. Default value depends on the property type: 
     * for string with format being binary – application/octet-stream; for other primitive types – text/plain; 
     * for object - application/json; for array – the default is defined based on the inner type. 
     * The value can be a specific media type (e.g. application/json), a wildcard media type (e.g. image/*), 
     * or a comma-separated list of the two types.
     */
    contentType: string;
    
    /**
     * A map allowing additional information to be provided as headers, for example Content-Disposition. 
     * Content-Type is described separately and SHALL be ignored in this section. This property SHALL be ignored 
     * if the request body media type is not a multipart.
     */
    headers: Header[];
    
}