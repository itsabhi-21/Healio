const mongoose = require("mongoose");

const symptomSessionSchema = new mongoose.Schema({
  symptoms: {
    type: [String],
    required: true,
  },

  possibleConditions: {
    type: [String],
  },

  generalAdvice: {
    type: [String],
  },

  warningSigns: {
    type: [String],
  },

  followUpQuestions: {
    type: [String],
  },

  urgent: {
    type: Boolean,
    default: false,
  },

  aiRawResponse: {
    type: Object, 
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
    }
});

module.exports = mongoose.model("SymptomSession", symptomSessionSchema);
