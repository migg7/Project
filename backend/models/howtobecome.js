const mongoose = require('mongoose');

const HowToBecomeSchema = new mongoose.Schema({

  role: {
    type: String,
    enum: ['Pilot', 'AME', 'Cabincrew', 'ATC', 'Groundcrew'],
    required: true
  },

  details: {
    type: String
  },

  link: {
    type: String
  },
  
  imageUrl: {
    type: String
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

}, { timestamps: true });

module.exports = mongoose.model('HowToBecome', HowToBecomeSchema);