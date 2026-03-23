const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Payment must belong to a user']
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: [true, 'Payment must be linked to a booking']
  },
  amount: {
    type: Number,
    required: [true, 'Please provide amount'],
    min: [0, 'Amount cannot be negative']
  },
  currency: {
    type: String,
    default: 'NGN',
    enum: ['NGN', 'USD', 'GBP']
  },
  paymentMethod: {
    type: String,
    required: [true, 'Please specify payment method'],
    enum: ['stripe', 'paystack', 'flutterwave', 'transfer'],
    lowercase: true
  },
  transactionId: {
    type: String,
    unique: true,
    sparse: true
  },
  reference: {
    type: String,
    unique: true,
    sparse: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'successful', 'failed', 'refunded'],
    default: 'pending'
  },
  description: String,
  metadata: mongoose.Schema.Types.Mixed,
  failureReason: String,
  refundAmount: {
    type: Number,
    default: 0
  },
  refundedAt: Date,
  refundReason: String,
  receiptUrl: String,
  invoiceNumber: String,
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
paymentSchema.index({ userId: 1 });
paymentSchema.index({ bookingId: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ transactionId: 1 });
paymentSchema.index({ createdAt: 1 });

// Generate invoice number
paymentSchema.pre('save', async function(next) {
  if (!this.invoiceNumber) {
    const count = await this.constructor.countDocuments();
    this.invoiceNumber = `INV-${new Date().getFullYear()}-${(count + 1).toString().padStart(6, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Payment', paymentSchema);