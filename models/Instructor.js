const mongoose = require('mongoose');

var SchemaTypes = mongoose.Schema.Types;

const instructorSchema = new mongoose.Schema({
  timezone: {
    type: String
  },
  language: {
    type: String
  },
  dexterity: {
    type: String
  },
  description: {
    type: String
  },
  rates: {
    type: SchemaTypes.Double
  },
  availableTimeSlots: {
    type: [Date]
  },
  courseAssociation: {
    type: String
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  lesson: {
    type: mongoose.Schema.ObjectId,
    ref: 'Lessson',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Instructor', instructorSchema);
