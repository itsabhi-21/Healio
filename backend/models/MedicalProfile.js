const mongoose = require("mongoose");

const medicalProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  // Basic Medical Information
  bloodType: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown']
  },

  height: {
    value: {
      type: Number // in cm
    },
    unit: {
      type: String,
      enum: ['cm', 'ft/in'],
      default: 'cm'
    }
  },

  weight: {
    value: {
      type: Number // in kg
    },
    unit: {
      type: String,
      enum: ['kg', 'lbs'],
      default: 'kg'
    }
  },

  // Medical History
  allergies: [{
    name: {
      type: String,
      required: true
    },
    severity: {
      type: String,
      enum: ['Mild', 'Moderate', 'Severe'],
      default: 'Moderate'
    },
    reaction: {
      type: String
    },
    dateAdded: {
      type: Date,
      default: Date.now
    }
  }],

  medications: [{
    name: {
      type: String,
      required: true
    },
    dosage: {
      type: String
    },
    frequency: {
      type: String
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    prescribedBy: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: true
    },
    dateAdded: {
      type: Date,
      default: Date.now
    }
  }],

  medicalConditions: [{
    name: {
      type: String,
      required: true
    },
    diagnosedDate: {
      type: Date
    },
    severity: {
      type: String,
      enum: ['Mild', 'Moderate', 'Severe']
    },
    status: {
      type: String,
      enum: ['Active', 'Resolved', 'Chronic', 'Under Treatment'],
      default: 'Active'
    },
    notes: {
      type: String
    },
    dateAdded: {
      type: Date,
      default: Date.now
    }
  }],

  // Family Medical History
  familyHistory: [{
    relation: {
      type: String,
      required: true // e.g., 'Mother', 'Father', 'Sibling'
    },
    condition: {
      type: String,
      required: true
    },
    ageOfOnset: {
      type: Number
    },
    notes: {
      type: String
    }
  }],

  // Emergency Contacts
  emergencyContacts: [{
    name: {
      type: String,
      required: true
    },
    relationship: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],

  // Healthcare Providers
  healthcareProviders: [{
    name: {
      type: String,
      required: true
    },
    specialty: {
      type: String
    },
    phone: {
      type: String
    },
    email: {
      type: String
    },
    address: {
      type: String
    },
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],

  // Insurance Information
  insurance: {
    provider: {
      type: String
    },
    policyNumber: {
      type: String
    },
    groupNumber: {
      type: String
    },
    expiryDate: {
      type: Date
    }
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
medicalProfileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for BMI calculation
medicalProfileSchema.virtual('bmi').get(function() {
  if (!this.height.value || !this.weight.value) return null;
  
  let heightInM = this.height.value;
  let weightInKg = this.weight.value;
  
  // Convert height to meters if needed
  if (this.height.unit === 'ft/in') {
    heightInM = heightInM * 0.3048; // Convert feet to meters
  } else {
    heightInM = heightInM / 100; // Convert cm to meters
  }
  
  // Convert weight to kg if needed
  if (this.weight.unit === 'lbs') {
    weightInKg = weightInKg * 0.453592;
  }
  
  const bmi = weightInKg / (heightInM * heightInM);
  return Math.round(bmi * 10) / 10; // Round to 1 decimal place
});

// Virtual for BMI category
medicalProfileSchema.virtual('bmiCategory').get(function() {
  const bmi = this.bmi;
  if (!bmi) return null;
  
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
});

medicalProfileSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("MedicalProfile", medicalProfileSchema);