import { Observable } from "rxjs";
import { RestAPIDeleteRequestBuilder, RestAPIGetRequestBuilder, RestAPIHelper, RestAPIPostRequestBuilder, RestAPIPutRequestOptionalStepBuilder, RestAPIPutRequestStepBodyParam, RestAPIStepCreateRequest, RestAPIStepHttpClient, RestAPIStepUrl } from "./rest-builder";
import { HttpClient, HttpParams } from "@angular/common/http";

export class RestAPIHelperImpl<T> implements RestAPIHelper<T>, RestAPIStepHttpClient<T>, RestAPIStepUrl<T>, RestAPIStepCreateRequest<T> {        
    
    private http_client!:HttpClient;
    private api_url:string = "";    

    Builder(): RestAPIStepHttpClient<T> {
        return this;
    }

    setHttpClient(http_client: HttpClient): RestAPIStepUrl<T> {
        this.http_client = http_client;
        return this;
    }
    
    setUrl(api_url: string): RestAPIStepCreateRequest<T> {
        this.api_url = api_url;
        return this;
    } 

    createGetRequest(): RestAPIGetRequestBuilder<T> {
        return new RestAPIGetRequestBuilderImpl(this.http_client, this.api_url);
    }

    createPostRequest(): RestAPIPostRequestBuilder<T> {
        return new RestAPIPostRequestBuilderImpl(this.http_client, this.api_url);
    }

    createPutRequest(): RestAPIPutRequestStepBodyParam<T> {
        return new RestAPIPutRequestBuilderImpl(this.http_client, this.api_url);
    }

    createDeleteRequest(): RestAPIDeleteRequestBuilder<T> {
        return new RestAPIDeleteRequestBuilderImpl(this.http_client, this.api_url);
    }
}

export class RestAPIGetRequestBuilderImpl<T> implements RestAPIGetRequestBuilder<T> {

    private http_client:HttpClient;
    private api_url:string = "";
    private query_params:Map<string,string> = new Map<string,string>();

    constructor(http_client:HttpClient, api_url:string) {
        this.http_client = http_client;
        this.api_url = api_url;
    }
    
    addQueryParam(key: string, value: string): this {
        this.query_params.set(key,value);
        return this;
    }

    invoke(): Observable<T[]> {
        let params = new HttpParams();
        this.query_params.forEach((key,value) => params.set(key,value));

        return this.http_client.get<T[]>(this.api_url, {params});
    }
}

export class RestAPIPostRequestBuilderImpl<T> implements RestAPIPostRequestBuilder<T> {

    private http_client:HttpClient;
    private api_url:string = "";
    private body_params:Map<string,string> = new Map<string,string>();

    constructor(http_client:HttpClient, api_url:string) {
        this.http_client = http_client;
        this.api_url = api_url;
    }

    addBodyParam(key: string, value: string): this {
        this.body_params.set(key,value);
        return this;
    }

    invoke(): Observable<T[]> {
        return this.http_client.post<T[]>(this.api_url, this.body_params);
    }
}

export class RestAPIPutRequestBuilderImpl<T> implements RestAPIPutRequestStepBodyParam<T>, RestAPIPutRequestOptionalStepBuilder<T> {
    
    private http_client:HttpClient;
    private api_url:string = "";
    private body_params:Map<string,string> = new Map<string,string>();

    constructor(http_client:HttpClient, api_url:string) {
        this.http_client = http_client;
        this.api_url = api_url;
    }

    setBodyParam(key: string, value: string): RestAPIPutRequestOptionalStepBuilder<T> {
        this.body_params.set(key,value);
        return this;
    }    
    
    addBodyParam(key: string, value: string): this {
        this.body_params.set(key,value);
        return this;
    }

    invoke(): Observable<T[]> {
        return this.http_client.put<T[]>(this.api_url, this.body_params);
    }
}

export class RestAPIDeleteRequestBuilderImpl<T> implements RestAPIDeleteRequestBuilder<T> {
    
    private http_client:HttpClient;
    private api_url:string = "";
    private query_params:Map<string,string> = new Map<string,string>();

    constructor(http_client:HttpClient, api_url:string) {
        this.http_client = http_client;
        this.api_url = api_url;
    }

    addQueryParam(key: string, value: string): this {
        this.query_params.set(key,value);
        return this;
    }

    invoke(): Observable<T[]> {
        let params = new HttpParams();
        this.query_params.forEach((key,value) => params.set(key,value));

        return this.http_client.delete<T[]>(this.api_url, {params})
    }
}