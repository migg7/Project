const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
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

module.exports = mongoose.model('Notification', NotificationSchema);