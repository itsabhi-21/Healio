const mongoose = require("mongoose");

const healthTrackerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  // Vital Signs
  vitals: {
    temperature: {
      value: {
        type: Number
      },
      unit: {
        type: String,
        enum: ['C', 'F'],
        default: 'C'
      },
      recordedAt: {
        type: Date,
        default: Date.now
      }
    },
    
    bloodPressure: {
      systolic: {
        type: Number
      },
      diastolic: {
        type: Number
      },
      recordedAt: {
        type: Date
      }
    },
    
    heartRate: {
      value: {
        type: Number
      },
      recordedAt: {
        type: Date
      }
    },
    
    weight: {
      value: {
        type: Number
      },
      unit: {
        type: String,
        enum: ['kg', 'lbs'],
        default: 'kg'
      },
      recordedAt: {
        type: Date
      }
    }
  },

  // Symptoms Tracking
  symptoms: [{
    name: {
      type: String,
      required: true
    },
    severity: {
      type: String,
      enum: ['Mild', 'Moderate', 'Severe'],
      required: true
    },
    duration: {
      type: String,
      enum: ['Less than 1 hour', '1-4 hours', '4-8 hours', '8-12 hours', 'All day']
    },
    notes: {
      type: String
    },
    timeOfDay: {
      type: String,
      enum: ['Morning', 'Afternoon', 'Evening', 'Night']
    }
  }],

  // Mood & Energy
  mood: {
    rating: {
      type: Number,
      min: 1,
      max: 10
    },
    description: {
      type: String,
      enum: ['Excellent', 'Good', 'Fair', 'Poor', 'Very Poor']
    },
    notes: {
      type: String
    }
  },

  energy: {
    level: {
      type: Number,
      min: 1,
      max: 10
    },
    description: {
      type: String,
      enum: ['Very High', 'High', 'Normal', 'Low', 'Very Low']
    }
  },

  // Sleep Tracking
  sleep: {
    hoursSlept: {
      type: Number,
      min: 0,
      max: 24
    },
    quality: {
      type: String,
      enum: ['Excellent', 'Good', 'Fair', 'Poor', 'Very Poor']
    },
    bedtime: {
      type: Date
    },
    wakeTime: {
      type: Date
    },
    notes: {
      type: String
    }
  },

  // Medication Tracking
  medications: [{
    name: {
      type: String,
      required: true
    },
    dosage: {
      type: String
    },
    timeTaken: {
      type: Date
    },
    taken: {
      type: Boolean,
      default: false
    },
    notes: {
      type: String
    }
  }],

  // Activities & Exercise
  activities: [{
    type: {
      type: String,
      enum: ['Exercise', 'Work', 'Rest', 'Social', 'Medical', 'Other']
    },
    description: {
      type: String
    },
    duration: {
      type: Number // in minutes
    },
    intensity: {
      type: String,
      enum: ['Light', 'Moderate', 'Vigorous']
    },
    startTime: {
      type: Date
    }
  }],

  // Diet & Nutrition
  nutrition: {
    waterIntake: {
      type: Number, // in liters
      default: 0
    },
    meals: [{
      type: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack']
      },
      description: {
        type: String
      },
      time: {
        type: Date
      },
      calories: {
        type: Number
      }
    }],
    supplements: [{
      name: {
        type: String
      },
      dosage: {
        type: String
      },
      taken: {
        type: Boolean,
        default: false
      }
    }]
  },

  // Overall Health Rating
  overallHealth: {
    rating: {
      type: Number,
      min: 1,
      max: 10
    },
    notes: {
      type: String
    }
  },

  // Entry Metadata
  entryType: {
    type: String,
    enum: ['Manual', 'Automated', 'Imported'],
    default: 'Manual'
  },

  dataSource: {
    type: String // e.g., 'Mobile App', 'Web App', 'Wearable Device'
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
healthTrackerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Compound index for efficient querying
healthTrackerSchema.index({ user: 1, date: -1 });
healthTrackerSchema.index({ user: 1, 'symptoms.name': 1 });

// Ensure one entry per user per date
healthTrackerSchema.index({ user: 1, date: 1 }, { unique: true });

// Virtual for formatted date
healthTrackerSchema.virtual('formattedDate').get(function() {
  return this.date.toISOString().split('T')[0];
});

// Virtual for symptom count
healthTrackerSchema.virtual('symptomCount').get(function() {
  return this.symptoms ? this.symptoms.length : 0;
});

// Virtual for average symptom severity
healthTrackerSchema.virtual('averageSymptomSeverity').get(function() {
  if (!this.symptoms || this.symptoms.length === 0) return null;
  
  const severityMap = { 'Mild': 1, 'Moderate': 2, 'Severe': 3 };
  const total = this.symptoms.reduce((sum, symptom) => {
    return sum + (severityMap[symptom.severity] || 0);
  }, 0);
  
  return Math.round((total / this.symptoms.length) * 10) / 10;
});

healthTrackerSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("HealthTracker", healthTrackerSchema);