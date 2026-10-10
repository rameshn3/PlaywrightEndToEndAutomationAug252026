import{test,expect} from '../../fixtures/apiFixture';
import{createBookingPayload} from '../../testdata/bookingTestData';
import { bookingResponseSchema } from '../../api/schemas/bookingSchema';
import {validateSchema} from '../../utils/schemaValidator';

test.describe('Booking API - Create Booking--then delete booking', () => {

    test('should create a new booking --> delete th same booking successfully', async ({ bookingApi }) => {
    
        const response = await bookingApi.createBooking(createBookingPayload);
        //lets validat the responseBody
        expect(response).toHaveProperty('bookingid');
        //schema validation using bookingResponseSchema
        expect(response.bookingid).toBeGreaterThan(0);
        validateSchema(response, bookingResponseSchema);

        const bookingId = response.bookingid;

        // Now let's delete the same booking
      await bookingApi.deleteBooking(bookingId);  

    });

      test('should return 403 when deleting a booking without authentication', async ({ bookingApi, apiContext }) => {
        const createdBooking = await bookingApi.createBooking(createBookingPayload);

        try {
          const response = await apiContext.delete(`/booking/${createdBooking.bookingid}`);

          expect(response.status()).toBe(403);
          expect(await response.text()).toBe('Forbidden');
        } finally {
          await bookingApi.deleteBooking(createdBooking.bookingid);
        }
      });

      test('should return 405 when deleting a booking with a non-existent ID', async ({ apiContext }) => {
        const authResponse = await apiContext.post('/auth', {
          data: {
            username: process.env.API_USERNAME,
            password: process.env.API_PASSWORD
          }
        });
        expect(authResponse.status()).toBe(200);
        const { token } = await authResponse.json();

        const response = await apiContext.delete('/booking/99999999', {
          headers: { cookie: `token=${token}` }
        });

        expect(response.status()).toBe(405);
        expect(await response.text()).toBe('Method Not Allowed');
      });
});