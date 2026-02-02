// Central export file for all Healio models
const User = require('./Users');
const MedicalProfile = require('./MedicalProfile');
const SymptomSession = require('./SymptomSession');
const HealthTracker = require('./HealthTracker');
const MedicalCondition = require('./MedicalCondition');
const HealthReport = require('./HealthReport');
const Notification = require('./Notification');
const AuditLog = require('./AuditLog');

module.exports = {
  User,
  MedicalProfile,
  SymptomSession,
  HealthTracker,
  MedicalCondition,
  HealthReport,
  AuditLog
};

// Model relationships and dependencies:
//
// User (1) -> (1) MedicalProfile
// User (1) -> (many) SymptomSession
// User (1) -> (many) HealthTracker
// User (1) -> (many) HealthReport
// User (1) -> (many) Notification
// User (1) -> (many) AuditLog
//
// SymptomSession (many) -> (many) MedicalCondition (via analysis)
// HealthReport (many) -> (many) SymptomSession
// HealthReport (many) -> (many) HealthTracker
//
// MedicalCondition (many) -> (many) MedicalCondition (related conditions)