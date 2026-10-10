import {test, expect} from '../../fixtures/apiFixture';

test.describe('Get all booking ids', () => {

    test('should get all booking ids', async ({ bookingApi }) => {
        const response = await bookingApi.getAllBookingIds();
        expect(response).toBeDefined();
        expect(Array.isArray(response)).toBe(true);
        expect(response.length).toBeGreaterThan(0);
    });

    test('should get booking details for each booking id', async ({ bookingApi }) => {
        const bookingIdsResponse = await bookingApi.getBookingResponse(2, 200);
        const bookingrespJson = await bookingIdsResponse.json();
        expect(bookingrespJson).toBeDefined();
        expect(bookingrespJson).toHaveProperty('firstname');
        expect(bookingrespJson).toHaveProperty('lastname');
        expect(bookingrespJson).toHaveProperty('totalprice');
        expect(bookingrespJson).toHaveProperty('depositpaid');
        expect(bookingrespJson).toHaveProperty('bookingdates');
        expect(bookingrespJson.bookingdates).toHaveProperty('checkin');
        expect(bookingrespJson.bookingdates).toHaveProperty('checkout');
    });

  
    test('should thow 404 statuscode for invalid booking id', async ({ bookingApi }) => {
        const invalidBookingId = 999999; 
        const response = await bookingApi.getBookingResponse(invalidBookingId, 404);
     expect(await response.text()).toBe("Not Found");
       
        
    });

})