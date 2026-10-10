import {
    APIRequestContext,
    APIResponse,
    expect
} from "@playwright/test";

export class BaseApi {

    protected apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    // Generic GET
    protected async get(
        endpoint: string,
        expectedStatus: number = 200,
        headers?: Record<string, string>
    ): Promise<APIResponse> {

        const response = await this.apiContext.get(endpoint, {
            headers
        });

        expect(response.status()).toBe(expectedStatus);

        return response;
    }

    // Generic POST
    protected async post(
        endpoint: string,
        payload?: object,
        expectedStatus: number = 200,
        headers?: Record<string, string>
    ): Promise<APIResponse> {

        const response = await this.apiContext.post(endpoint, {
            data: payload,
            headers
        });

        expect(response.status()).toBe(expectedStatus);

        return response;
    }

    // Generic PUT
    protected async put(
        endpoint: string,
        payload?: object,
        expectedStatus: number=200,
        headers?: Record<string, string>
    ): Promise<APIResponse> {

        const response = await this.apiContext.put(endpoint, {
            data: payload,
            headers
        });

        expect(response.status()).toBe(expectedStatus);

        return response;
    }

    // Generic PATCH
    protected async patch(
        endpoint: string,
        payload?: object,
        expectedStatus: number = 200,
        headers?: Record<string, string>
    ): Promise<APIResponse> {

        const response = await this.apiContext.patch(endpoint, {
            data: payload,
            headers
        });

        expect(response.status()).toBe(expectedStatus);

        return response;
    }

    // Generic DELETE
    protected async delete(
        endpoint: string,
        expectedStatus: number = 201,
        headers?: Record<string, string>
    ): Promise<APIResponse> {

        const response = await this.apiContext.delete(endpoint, {
            headers
        });

        expect(response.status()).toBe(expectedStatus);

        return response;
    }
}