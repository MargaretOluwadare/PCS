const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide subscription name'],
    enum: ['Basic', 'Standard', 'Premium', 'Enterprise'],
    unique: true
  },
  description: String,
  price: {
    type: Number,
    required: [true, 'Please provide price'],
    min: [0, 'Price cannot be negative']
  },
  billingCycle: {
    type: String,
    required: [true, 'Please specify billing cycle'],
    enum: ['monthly', 'quarterly', 'yearly']
  },
  features: [{
    name: String,
    limit: Number
  }],
  maxBookings: {
    type: Number,
    required: true
  },
  discountPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);