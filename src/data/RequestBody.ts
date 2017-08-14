
/**
 * Describes a single request body.
 * https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.0.md#requestBodyObject
 */
export default class RequestBody {
    
    /**
     * A brief description of the request body. This could contain examples of use.
     */
    description: string;
    
    /**
     * Determines if the request body is required in the request. Defaults to false.
     */
    required: boolean = false;
    
    /**
     * REQUIRED. The content of the request body. The key is a media type or media type range 
     * and the value describes it. For requests that match multiple keys, only the most specific 
     * key is applicable. e.g. text/plain overrides text/*
     */
    content: MediaType[];
    
}