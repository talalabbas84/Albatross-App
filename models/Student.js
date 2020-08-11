const mongoose = require('mongoose');

var SchemaTypes = mongoose.Schema.Types;

const studentSchema = new mongoose.Schema({
  timezone: {
    type: String
  },
  language: {
    type: String
  },
  handicap: {
    type: [String]
  },
  areaOfFocus: {
    type: String
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Student', studentSchema);
