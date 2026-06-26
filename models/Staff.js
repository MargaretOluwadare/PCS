const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Staff must be linked to a user'],
    unique: true
  },
  employeeId: {
    type: String,
    unique: true,
    required: [true, 'Employee ID is required']
  },
  position: {
    type: String,
    required: [true, 'Please specify position'],
    enum: ['Cleaner', 'Supervisor', 'Manager'],
    default: 'Cleaner'
  },
  department: String,
  hireDate: {
    type: Date,
    required: [true, 'Please provide hire date']
  },
  salary: {
    type: Number,
    required: [true, 'Please provide salary'],
    min: [0, 'Salary cannot be negative']
  },
  bankAccount: {
    accountNumber: String,
    bankName: String,
    accountHolder: String,
    routingNumber: String
  },
  specializations: [String],
  skills: [String],
  availability: {
    monday: { from: String, to: String },
    tuesday: { from: String, to: String },
    wednesday: { from: String, to: String },
    thursday: { from: String, to: String },
    friday: { from: String, to: String },
    saturday: { from: String, to: String },
    sunday: { from: String, to: String }
  },
  currentLocation: {
    latitude: Number,
    longitude: Number,
    lastUpdated: Date
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalJobsCompleted: {
    type: Number,
    default: 0
  },
  totalEarnings: {
    type: Number,
    default: 0
  },
  assignedBookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  backgroundCheckCompleted: {
    type: Boolean,
    default: false
  },
  backgroundCheckDate: Date,
  backgroundCheckStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  certifications: [{
    name: String,
    issueDate: Date,
    expiryDate: Date,
    certificateUrl: String
  }],
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String
  },
  bankVerified: {
    type: Boolean,
    default: false
  },
  identityVerified: {
    type: Boolean,
    default: false
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

// Index for faster queries
staffSchema.index({ userId: 1 });
staffSchema.index({ isActive: 1 });
staffSchema.index({ position: 1 });
staffSchema.index({ currentLocation: '2dsphere' });

module.exports = mongoose.model('Staff', staffSchema);