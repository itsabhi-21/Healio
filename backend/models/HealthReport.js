const mongoose = require("mongoose");

const healthReportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // Report Basic Information
  title: {
    type: String,
    required: true,
    trim: true
  },

  type: {
    type: String,
    enum: ['Symptom Analysis', 'Health Summary', 'Tracker Report', 'Medical History', 'Custom'],
    required: true
  },

  // Report Content
  summary: {
    type: String,
    required: true
  },

  // Date Range
  dateRange: {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    }
  },

  // Symptom Sessions Included
  symptomSessions: [{
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SymptomSession'
    },
    includedAt: {
      type: Date,
      default: Date.now
    }
  }],

  // Health Tracker Data Included
  trackerEntries: [{
    entry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HealthTracker'
    },
    includedAt: {
      type: Date,
      default: Date.now
    }
  }],

  // Report Sections
  sections: [{
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['Text', 'Chart', 'Table', 'List', 'Timeline'],
      default: 'Text'
    },
    order: {
      type: Number,
      required: true
    },
    data: {
      type: mongoose.Schema.Types.Mixed // For chart data, table data, etc.
    }
  }],

  // Key Insights
  insights: [{
    category: {
      type: String,
      enum: ['Symptoms', 'Trends', 'Recommendations', 'Warnings', 'Improvements']
    },
    insight: {
      type: String,
      required: true
    },
    severity: {
      type: String,
      enum: ['Info', 'Warning', 'Critical'],
      default: 'Info'
    },
    confidence: {
      type: Number,
      min: 0,
      max: 100
    }
  }],

  // Recommendations
  recommendations: [{
    category: {
      type: String,
      enum: ['Lifestyle', 'Medical', 'Monitoring', 'Emergency', 'Follow-up']
    },
    recommendation: {
      type: String,
      required: true
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Urgent'],
      default: 'Medium'
    },
    timeframe: {
      type: String,
      enum: ['Immediate', 'Within 24 hours', 'Within a week', 'Within a month', 'Ongoing']
    }
  }],

  // Health Metrics Summary
  healthMetrics: {
    symptomFrequency: {
      type: Number,
      default: 0
    },
    averageSeverity: {
      type: Number,
      min: 1,
      max: 10
    },
    mostCommonSymptoms: [{
      symptom: String,
      frequency: Number
    }],
    healthTrends: [{
      metric: String,
      trend: {
        type: String,
        enum: ['Improving', 'Stable', 'Declining', 'Variable']
      },
      change: Number // percentage change
    }]
  },

  // Sharing & Export
  sharing: {
    isShared: {
      type: Boolean,
      default: false
    },
    sharedWith: [{
      email: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      relationship: {
        type: String,
        enum: ['Doctor', 'Family', 'Caregiver', 'Other']
      },
      sharedAt: {
        type: Date,
        default: Date.now
      },
      accessLevel: {
        type: String,
        enum: ['View', 'Comment'],
        default: 'View'
      }
    }],
    shareLink: {
      type: String,
      unique: true,
      sparse: true
    },
    linkExpiry: {
      type: Date
    }
  },

  // Export Information
  exports: [{
    format: {
      type: String,
      enum: ['PDF', 'Word', 'Excel', 'JSON'],
      required: true
    },
    exportedAt: {
      type: Date,
      default: Date.now
    },
    fileSize: {
      type: Number // in bytes
    },
    downloadCount: {
      type: Number,
      default: 0
    }
  }],

  // Report Generation
  generatedBy: {
    type: String,
    enum: ['User', 'System', 'AI', 'Doctor'],
    default: 'System'
  },

  generationSettings: {
    includeCharts: {
      type: Boolean,
      default: true
    },
    includeRecommendations: {
      type: Boolean,
      default: true
    },
    includeRawData: {
      type: Boolean,
      default: false
    },
    language: {
      type: String,
      default: 'English'
    }
  },

  // Status & Metadata
  status: {
    type: String,
    enum: ['Draft', 'Generated', 'Shared', 'Archived'],
    default: 'Generated'
  },

  version: {
    type: Number,
    default: 1
  },

  tags: [{
    type: String,
    trim: true
  }],

  // Privacy & Security
  isPrivate: {
    type: Boolean,
    default: true
  },

  encryptionKey: {
    type: String // For sensitive reports
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  },

  lastAccessedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
healthReportSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Indexes for efficient querying
healthReportSchema.index({ user: 1, createdAt: -1 });
healthReportSchema.index({ type: 1, status: 1 });
healthReportSchema.index({ 'sharing.isShared': 1 });
healthReportSchema.index({ 'dateRange.startDate': 1, 'dateRange.endDate': 1 });

// Virtual for report age
healthReportSchema.virtual('reportAge').get(function() {
  const now = new Date();
  const created = new Date(this.createdAt);
  const diffTime = Math.abs(now - created);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Virtual for date range duration
healthReportSchema.virtual('dateRangeDuration').get(function() {
  if (!this.dateRange.startDate || !this.dateRange.endDate) return null;
  
  const start = new Date(this.dateRange.startDate);
  const end = new Date(this.dateRange.endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Virtual for total sections
healthReportSchema.virtual('totalSections').get(function() {
  return this.sections ? this.sections.length : 0;
});

healthReportSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("HealthReport", healthReportSchema);