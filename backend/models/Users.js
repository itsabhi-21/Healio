const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Basic Information
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  
  lastName: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  phone: {
    type: String,
    trim: true
  },

  // Personal Information
  dateOfBirth: {
    type: Date
  },

  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', 'Prefer not to say']
  },

  location: {
    type: String,
    trim: true
  },

  // Profile Settings
  profilePicture: {
    type: String, // URL to profile image
    default: null
  },

  // Account Settings
  isEmailVerified: {
    type: Boolean,
    default: false
  },

  isPhoneVerified: {
    type: Boolean,
    default: false
  },

  // Privacy & Preferences
  preferences: {
    notifications: {
      type: Boolean,
      default: true
    },
    emailUpdates: {
      type: Boolean,
      default: true
    },
    dataSharing: {
      type: Boolean,
      default: false
    },
    language: {
      type: String,
      default: 'English'
    },
    timezone: {
      type: String,
      default: 'Pacific Time (PT)'
    }
  },

  // Security
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },

  twoFactorSecret: {
    type: String
  },

  // Account Status
  isActive: {
    type: Boolean,
    default: true
  },

  lastLogin: {
    type: Date
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
userSchema.pre('save', function() {
  this.updatedAt = Date.now();
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for age calculation
userSchema.virtual('age').get(function() {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

// Ensure virtual fields are serialized
userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("User", userSchema);
