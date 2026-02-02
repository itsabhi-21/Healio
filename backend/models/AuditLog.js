const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  // User Information
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  userEmail: {
    type: String // Store email for reference even if user is deleted
  },

  // Action Details
  action: {
    type: String,
    required: true,
    enum: [
      'LOGIN',
      'LOGOUT',
      'REGISTER',
      'PASSWORD_CHANGE',
      'PROFILE_UPDATE',
      'SYMPTOM_CHECK',
      'HEALTH_TRACK',
      'REPORT_GENERATE',
      'REPORT_SHARE',
      'REPORT_EXPORT',
      'DATA_EXPORT',
      'DATA_DELETE',
      'SETTINGS_UPDATE',
      'MEDICAL_PROFILE_UPDATE',
      'EMERGENCY_CONTACT_UPDATE',
      'TWO_FACTOR_ENABLE',
      'TWO_FACTOR_DISABLE',
      'ACCOUNT_DELETE',
      'ADMIN_ACTION',
      'API_ACCESS',
      'ERROR'
    ]
  },

  resource: {
    type: String, // What was acted upon (e.g., 'User', 'SymptomSession', 'HealthReport')
    required: true
  },

  resourceId: {
    type: mongoose.Schema.Types.ObjectId // ID of the resource that was acted upon
  },

  // Request Details
  method: {
    type: String,
    enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    required: true
  },

  endpoint: {
    type: String,
    required: true
  },

  // Result
  status: {
    type: String,
    enum: ['SUCCESS', 'FAILURE', 'ERROR'],
    required: true
  },

  statusCode: {
    type: Number // HTTP status code
  },

  // Changes Made
  changes: {
    before: {
      type: mongoose.Schema.Types.Mixed // Previous state
    },
    after: {
      type: mongoose.Schema.Types.Mixed // New state
    },
    fields: [{
      type: String // List of fields that were changed
    }]
  },

  // Request Context
  ipAddress: {
    type: String,
    required: true
  },

  userAgent: {
    type: String
  },

  sessionId: {
    type: String
  },

  // Geographic Information
  location: {
    country: String,
    region: String,
    city: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },

  // Device Information
  device: {
    type: {
      type: String,
      enum: ['Desktop', 'Mobile', 'Tablet', 'Unknown']
    },
    os: String,
    browser: String,
    version: String
  },

  // Error Details (if applicable)
  error: {
    message: String,
    stack: String,
    code: String
  },

  // Additional Metadata
  metadata: {
    type: mongoose.Schema.Types.Mixed // Any additional context-specific data
  },

  // Processing Time
  processingTime: {
    type: Number // Time taken to process request in milliseconds
  },

  // Risk Assessment
  riskLevel: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
    default: 'LOW'
  },

  riskFactors: [{
    factor: String,
    score: Number
  }],

  // Compliance & Privacy
  dataClassification: {
    type: String,
    enum: ['PUBLIC', 'INTERNAL', 'CONFIDENTIAL', 'RESTRICTED'],
    default: 'INTERNAL'
  },

  containsPII: {
    type: Boolean,
    default: false
  },

  containsPHI: {
    type: Boolean,
    default: false
  },

  // Retention
  retentionPeriod: {
    type: Number, // Days to retain this log
    default: 2555 // 7 years default for medical data
  },

  expiresAt: {
    type: Date
  },

  // Timestamps
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Set expiration based on retention period
auditLogSchema.pre('save', function(next) {
  if (this.retentionPeriod && !this.expiresAt) {
    this.expiresAt = new Date(Date.now() + (this.retentionPeriod * 24 * 60 * 60 * 1000));
  }
  next();
});

// Indexes for efficient querying and automatic cleanup
auditLogSchema.index({ timestamp: -1 });
auditLogSchema.index({ user: 1, timestamp: -1 });
auditLogSchema.index({ action: 1, timestamp: -1 });
auditLogSchema.index({ status: 1, timestamp: -1 });
auditLogSchema.index({ riskLevel: 1, timestamp: -1 });
auditLogSchema.index({ ipAddress: 1, timestamp: -1 });
auditLogSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index

// Compound indexes for common queries
auditLogSchema.index({ user: 1, action: 1, timestamp: -1 });
auditLogSchema.index({ resource: 1, resourceId: 1, timestamp: -1 });

// Virtual for log age
auditLogSchema.virtual('age').get(function() {
  const now = new Date();
  const created = new Date(this.timestamp);
  const diffTime = Math.abs(now - created);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Static method to log an action
auditLogSchema.statics.logAction = function(actionData) {
  const log = new this(actionData);
  return log.save();
};

// Static method to get user activity summary
auditLogSchema.statics.getUserActivitySummary = function(userId, days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  return this.aggregate([
    {
      $match: {
        user: userId,
        timestamp: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: '$action',
        count: { $sum: 1 },
        lastActivity: { $max: '$timestamp' }
      }
    },
    {
      $sort: { count: -1 }
    }
  ]);
};

// Static method to detect suspicious activity
auditLogSchema.statics.detectSuspiciousActivity = function(userId, hours = 24) {
  const startDate = new Date();
  startDate.setHours(startDate.getHours() - hours);
  
  return this.aggregate([
    {
      $match: {
        user: userId,
        timestamp: { $gte: startDate },
        $or: [
          { riskLevel: { $in: ['HIGH', 'CRITICAL'] } },
          { status: 'FAILURE' },
          { action: { $in: ['LOGIN', 'PASSWORD_CHANGE'] } }
        ]
      }
    },
    {
      $group: {
        _id: '$ipAddress',
        actions: { $push: '$action' },
        count: { $sum: 1 },
        riskLevels: { $push: '$riskLevel' }
      }
    },
    {
      $match: {
        $or: [
          { count: { $gte: 10 } }, // High frequency
          { riskLevels: { $in: ['HIGH', 'CRITICAL'] } }
        ]
      }
    }
  ]);
};

auditLogSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("AuditLog", auditLogSchema);