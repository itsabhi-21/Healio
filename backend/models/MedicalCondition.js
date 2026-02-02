const mongoose = require("mongoose");

const medicalConditionSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  alternativeNames: [{
    type: String,
    trim: true
  }],

  category: {
    type: String,
    required: true,
    enum: [
      'Cardiovascular',
      'Respiratory',
      'Neurological',
      'Gastrointestinal',
      'Musculoskeletal',
      'Dermatological',
      'Endocrine',
      'Infectious',
      'Mental Health',
      'Reproductive',
      'Urological',
      'Ophthalmological',
      'ENT',
      'Hematological',
      'Immunological',
      'Other'
    ]
  },

  // Medical Classification
  icd10Code: {
    type: String,
    trim: true
  },

  severity: {
    type: String,
    enum: ['Mild', 'Moderate', 'Severe', 'Life-threatening'],
    required: true
  },

  urgency: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Emergency'],
    required: true
  },

  // Description & Information
  description: {
    type: String,
    required: true
  },

  shortDescription: {
    type: String,
    required: true,
    maxlength: 200
  },

  // Symptoms
  commonSymptoms: [{
    symptom: {
      type: String,
      required: true
    },
    frequency: {
      type: String,
      enum: ['Always', 'Usually', 'Sometimes', 'Rarely']
    },
    severity: {
      type: String,
      enum: ['Mild', 'Moderate', 'Severe']
    }
  }],

  rareSymptoms: [{
    symptom: {
      type: String,
      required: true
    },
    frequency: {
      type: String,
      enum: ['Always', 'Usually', 'Sometimes', 'Rarely']
    }
  }],

  // Risk Factors
  riskFactors: [{
    factor: {
      type: String,
      required: true
    },
    impact: {
      type: String,
      enum: ['Low', 'Medium', 'High']
    }
  }],

  // Demographics
  ageGroups: [{
    type: String,
    enum: ['Infants', 'Children', 'Adolescents', 'Adults', 'Elderly', 'All ages']
  }],

  genderPrevalence: {
    type: String,
    enum: ['More common in males', 'More common in females', 'Equal prevalence', 'Unknown']
  },

  // Treatment & Management
  treatmentOptions: [{
    type: {
      type: String,
      enum: ['Medication', 'Surgery', 'Therapy', 'Lifestyle', 'Monitoring', 'Emergency']
    },
    description: {
      type: String,
      required: true
    },
    urgency: {
      type: String,
      enum: ['Immediate', 'Urgent', 'Routine', 'Optional']
    }
  }],

  selfCareAdvice: [{
    advice: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ['Rest', 'Diet', 'Exercise', 'Medication', 'Monitoring', 'Lifestyle']
    }
  }],

  // Red Flags & Warning Signs
  redFlags: [{
    warning: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true
    },
    urgency: {
      type: String,
      enum: ['Call 911', 'Go to ER', 'See doctor today', 'See doctor soon'],
      required: true
    }
  }],

  // Prognosis & Outcomes
  prognosis: {
    type: String,
    enum: ['Excellent', 'Good', 'Fair', 'Poor', 'Variable']
  },

  duration: {
    type: String,
    enum: ['Acute', 'Chronic', 'Episodic', 'Progressive', 'Variable']
  },

  // Prevention
  preventionMeasures: [{
    measure: {
      type: String,
      required: true
    },
    effectiveness: {
      type: String,
      enum: ['High', 'Medium', 'Low', 'Unknown']
    }
  }],

  // Related Conditions
  relatedConditions: [{
    condition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MedicalCondition'
    },
    relationship: {
      type: String,
      enum: ['Complication', 'Risk factor', 'Similar symptoms', 'Differential diagnosis']
    }
  }],

  // Medical Resources
  resources: [{
    title: {
      type: String,
      required: true
    },
    url: {
      type: String
    },
    type: {
      type: String,
      enum: ['Article', 'Video', 'Guidelines', 'Research', 'Support group']
    }
  }],

  // AI Training Data
  aiTrainingData: {
    keyPhrases: [{
      type: String
    }],
    diagnosticCriteria: [{
      criterion: {
        type: String,
        required: true
      },
      weight: {
        type: Number,
        min: 0,
        max: 1
      }
    }],
    confidenceThreshold: {
      type: Number,
      min: 0,
      max: 1,
      default: 0.7
    }
  },

  // Metadata
  isActive: {
    type: Boolean,
    default: true
  },

  lastReviewed: {
    type: Date,
    default: Date.now
  },

  reviewedBy: {
    type: String // Medical professional who reviewed
  },

  version: {
    type: Number,
    default: 1
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
medicalConditionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Text search index
medicalConditionSchema.index({
  name: 'text',
  'alternativeNames': 'text',
  description: 'text',
  'commonSymptoms.symptom': 'text'
});

// Category and severity indexes
medicalConditionSchema.index({ category: 1, severity: 1 });
medicalConditionSchema.index({ urgency: 1 });
medicalConditionSchema.index({ isActive: 1 });

// Virtual for symptom count
medicalConditionSchema.virtual('totalSymptoms').get(function() {
  return (this.commonSymptoms?.length || 0) + (this.rareSymptoms?.length || 0);
});

medicalConditionSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("MedicalCondition", medicalConditionSchema);