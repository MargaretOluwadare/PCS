const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a user']
  },
  service: {
    type: String,
    required: [true, 'Please specify a service'],
    enum: ['General Cleaning', 'Deep Cleaning', 'Office Cleaning', 'Post-Construction Cleaning', 'Carpet Cleaning'],
    trim: true
  },
  servicePrice: {
    type: Number,
    required: [true, 'Service price is required']
  },
  date: {
    type: Date,
    required: [true, 'Please provide a booking date'],
    validate: {
      validator: function(v) {
        return v > new Date();
      },
      message: 'Booking date must be in the future'
    }
  },
  time: {
    type: String,
    required: [true, 'Please provide a time'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide a valid time (HH:MM)']
  },
  duration: {
    type: Number,
    required: [true, 'Please specify duration in hours'],
    min: [0.5, 'Minimum duration is 30 minutes'],
    max: [8, 'Maximum duration is 8 hours']
  },
  location: {
    address: {
      type: String,
      required: [true, 'Please provide an address']
    },
    city: String,
    state: String,
    zipCode: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid', 'refunded'],
    default: 'unpaid'
  },
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
    default: null
  },
  assignedStaff: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    default: null
  }],
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  specialRequirements: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  review: {
    type: String,
    maxlength: [1000, 'Review cannot exceed 1000 characters']
  },
  cancellationReason: String,
  cancellationChargePercentage: {
    type: Number,
    default: 0
  },
  completedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Index for faster queries
bookingSchema.index({ userId: 1 });
bookingSchema.index({ date: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ paymentStatus: 1 });
bookingSchema.index({ 'location.coordinates': '2dsphere' });

module.exports = mongoose.model('Booking', bookingSchema);