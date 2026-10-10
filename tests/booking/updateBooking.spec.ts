import{test,expect} from '../../fixtures/apiFixture';
import{createBookingPayload} from '../../testdata/bookingTestData';
import { bookingResponseSchema } from '../../api/schemas/bookingSchema';
import {validateSchema} from '../../utils/schemaValidator';
import { updateBookingPayload } from '../../testdata/bookingTestData';

test.describe('Booking API - Create Booking-->Update same boking', () => {

    test('should create a new booking then update same booking successfully', async ({ bookingApi }) => {
    
        const response = await bookingApi.createBooking(createBookingPayload);
        //lets validat the responseBody
        expect(response).toHaveProperty('bookingid');
        //schema validation using bookingResponseSchema
        expect(response.bookingid).toBeGreaterThan(0);
        validateSchema(response, bookingResponseSchema);

        const bookingId = response.bookingid;

        // Now let's update the same booking
        const updateResponse = await bookingApi.updateBooking(bookingId, updateBookingPayload,200);

        // Validate the update response
        expect(updateResponse).toHaveProperty('firstname', updateBookingPayload.firstname);
        expect(updateResponse).toHaveProperty('lastname', updateBookingPayload.lastname);
        expect(updateResponse).toHaveProperty('totalprice', updateBookingPayload.totalprice);
        expect(updateResponse).toHaveProperty('depositpaid', updateBookingPayload.depositpaid);
        expect(updateResponse).toHaveProperty('bookingdates');
        expect(updateResponse.bookingdates).toHaveProperty('checkin', updateBookingPayload.bookingdates.checkin);
        expect(updateResponse.bookingdates).toHaveProperty('checkout', updateBookingPayload.bookingdates.checkout);
        validateSchema(updateResponse, bookingResponseSchema);
    });


test('should update a booking with PATCH Endpoint', async ({ bookingApi }) => {
   
const response = await bookingApi.createBooking(createBookingPayload);
        //lets validat the responseBody
        expect(response).toHaveProperty('bookingid');
      const bookingId = response.bookingid;

        // Now let's update the same booking using PATCH endpoint
        const patchResponse = await bookingApi.partialUpdateBooking(bookingId, { firstname: "UpdatedName" });

        // Validate the patch responseBody
        expect(patchResponse).toHaveProperty('firstname', "UpdatedName");
        expect(patchResponse).toHaveProperty('lastname', createBookingPayload.lastname);
        expect(patchResponse).toHaveProperty('totalprice', createBookingPayload.totalprice);
        expect(patchResponse).toHaveProperty('depositpaid', createBookingPayload.depositpaid);
        expect(patchResponse).toHaveProperty('bookingdates');
        expect(patchResponse.bookingdates).toHaveProperty('checkin', createBookingPayload.bookingdates.checkin);
        expect(patchResponse.bookingdates).toHaveProperty('checkout', createBookingPayload.bookingdates.checkout);
        validateSchema(patchResponse, bookingResponseSchema);
    });

    test('should reject updating a booking without authentication', async ({ bookingApi, apiContext }) => {
        const createdBooking = await bookingApi.createBooking(createBookingPayload);

        try {
            const response = await apiContext.put(`/booking/${createdBooking.bookingid}`, {
                data: updateBookingPayload
            });

            expect(response.status()).toBe(403);
            expect(await response.text()).toBe('Forbidden');
        } finally {
            await bookingApi.deleteBooking(createdBooking.bookingid);
        }
    });

    test('should reject updating a booking with a non-existent booking ID', async ({ apiContext }) => {
        const authResponse = await apiContext.post('/auth', {
            data: {
                username: process.env.API_USERNAME,
                password: process.env.API_PASSWORD
            }
        });
        expect(authResponse.status()).toBe(200);
        const { token } = await authResponse.json();

        const response = await apiContext.put('/booking/99999999', {
            data: updateBookingPayload,
            headers: { cookie: `token=${token}` }
        });

        expect(response.status()).toBe(405);
        expect(await response.text()).toBe('Method Not Allowed');
    });



});