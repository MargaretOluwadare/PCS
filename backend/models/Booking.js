'use strict';

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  status: { type: String, required: true },
  assignedStaff: { type: String, required: false }
});

module.exports = mongoose.model('Booking', bookingSchema);