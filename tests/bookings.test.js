const request = require('supertest');
const app = require('../app'); // Assuming the main app file is at this path

describe('Booking CRUD Operations', () => {
  let bookingId;

  // Test Create Booking
  it('should create a booking', async () => {
    const response = await request(app)
      .post('/api/bookings')
      .send({
        name: 'Test Booking',
        date: '2026-03-23',
        time: '13:00',
        duration: 2
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    bookingId = response.body.id; // Store the booking ID for later tests
  });

  // Test Create Booking Validation Errors
  it('should return validation error on invalid data', async () => {
    const response = await request(app)
      .post('/api/bookings')
      .send({}); // Invalid data
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  // Test Read Booking
  it('should retrieve a booking by ID', async () => {
    const response = await request(app)
      .get(`/api/bookings/${bookingId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', bookingId);
  });

  // Test Read Booking Not Found
  it('should return 404 for nonexistent booking', async () => {
    const response = await request(app)
      .get('/api/bookings/9999'); // Assuming this ID does not exist
    expect(response.status).toBe(404);
  });

  // Test Update Booking
  it('should update a booking', async () => {
    const response = await request(app)
      .put(`/api/bookings/${bookingId}`)
      .send({
        name: 'Updated Test Booking',
        date: '2026-03-24',
        time: '15:00',
        duration: 1
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'Updated Test Booking');
  });

  // Test Update Booking Validation Errors
  it('should return validation error on updating with invalid data', async () => {
    const response = await request(app)
      .put(`/api/bookings/${bookingId}`)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  // Test Delete Booking
  it('should delete a booking by ID', async () => {
    const response = await request(app)
      .delete(`/api/bookings/${bookingId}`);
    expect(response.status).toBe(204);
  });

  // Test Delete Booking Not Found
  it('should return 404 for nonexistent booking deletion', async () => {
    const response = await request(app)
      .delete(`/api/bookings/${bookingId}`);
    expect(response.status).toBe(404);
  });
});
