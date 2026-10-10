import{test as base, request,APIRequestContext} from "@playwright/test";
import { BookingApi } from "../api/bookingApi";

type ApiFixtures = {
    apiContext: APIRequestContext;
    bookingApi: BookingApi;
}

export const test = base.extend<ApiFixtures>({
    apiContext: async ({}, use) => {
        const apiContext = await request.newContext({
            baseURL: process.env.API_BASE_URL,
            extraHTTPHeaders: {
                'Content-Type': 'application/json',
                 'Accept': 'application/json'
            }
        });
        await use(apiContext);
        await apiContext.dispose();
    },

    bookingApi: async ({ apiContext }, use) => {
        const bookingApi = new BookingApi(apiContext);
        await use(bookingApi);
    }
});

export { expect } from "@playwright/test";