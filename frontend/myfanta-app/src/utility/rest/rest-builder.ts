import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface RestAPIHelper<T> {
    Builder():RestAPIStepHttpClient<T>;
}

/*
 * STEP 1: HttpClient
 */
export interface RestAPIStepHttpClient<T> {
    setHttpClient(http_client:HttpClient):RestAPIStepUrl<T>;
}


/*
 * STEP 2: URL
 */
export interface RestAPIStepUrl<T> {
    setUrl(api_url:string):RestAPIStepCreateRequest<T>;
}

/*
 * STEP 3: CREATE REQUEST
 */
export interface RestAPIStepCreateRequest<T> {
    createGetRequest():RestAPIGetRequestBuilder<T>;
    createPostRequest():RestAPIPostRequestBuilder<T>;
    createPutRequest():RestAPIPutRequestStepBodyParam<T>;
    createDeleteRequest():RestAPIDeleteRequestBuilder<T>;
}

/* 
 * =====================
 * BUILDER GET REQUEST
 * =====================
 */

/*
 * Step aggiunta parametri opzionali + invocazione API
 */
export interface RestAPIGetRequestBuilder<T> {
    addQueryParam(key:string, value:string):this;
    invoke():Observable<T[]>;
}

/*
 * ======================
 * BUILDER POST REQUEST
 * ======================
 */

/*
 * Step aggiunta parametri opzionali + invocazione API
 */
export interface RestAPIPostRequestBuilder<T> {
    addBodyParam(key:string, value:string):this;
    invoke():Observable<T[]>;
}

/*
 * ====================
 * BUILDER PUT REQUEST 
 * ====================
 */

/*
 * Step aggiunta parametro body
 */
export interface RestAPIPutRequestStepBodyParam<T> {
    setBodyParam(key:string, value:string):RestAPIPutRequestOptionalStepBuilder<T>;
}

/*
 * Step aggiunta parametri opzionali + invocazione API
 */
export interface RestAPIPutRequestOptionalStepBuilder<T> {
    addBodyParam(key:string, value:string):this;
    invoke():Observable<T[]>;
}

/*
 * ======================= 
 * BUILDER DELETE REQUEST
 * =======================
 */

/*
 * Step aggiunta parametri opzionali + invocazione API
 */
export interface RestAPIDeleteRequestBuilder<T> {
    addQueryParam(key:string, value:string):this;
    invoke():Observable<T[]>;
}