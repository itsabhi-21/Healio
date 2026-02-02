const mongoose = require('mongoose');

const SymptomSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },

    symptoms: {
      description: {
        type: String,
        default: ''   // 🔴 NOT required anymore
      },
      selectedSymptoms: {
        type: [String],
        default: []
      },
      duration: {
        type: String
      },
      severity: {
        type: String,
        required: true
      },
      location: {
        type: String
      }
    },

    analysis: {
      possibleConditions: {
        type: [String],   // 🔴 CHANGED (was embedded docs)
        default: []
      },
      generalAdvice: {
        type: [String],
        default: []
      },
      warningSigns: {
        type: [String],
        default: []
      }
    },

    sessionData: {
      ipAddress: String,
      userAgent: String,
      processingTime: Number,
      aiModel: String
    },

    aiRawResponse: {
      type: mongoose.Schema.Types.Mixed
    },

    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed'],
      default: 'Completed'
    },

    feedback: {
      helpful: Boolean,
      rating: Number,
      comments: String,
      submittedAt: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('SymptomSession', SymptomSessionSchema);
