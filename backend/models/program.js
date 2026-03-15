const mongoose = require("mongoose");

const ProgramSchema = new mongoose.Schema({

  type: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  description: {
    type: String
  },
  imageUrl: {
    type: String
  }

}, { timestamps: true });

module.exports = mongoose.model("Program", ProgramSchema);