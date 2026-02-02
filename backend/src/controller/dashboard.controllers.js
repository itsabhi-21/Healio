const User = require('../../models/Users');
const SymptomSession = require('../../models/SymptomSession');
const HealthTracker = require('../../models/HealthTracker');
const HealthReport = require('../../models/HealthReport');

// Get dashboard overview data
const getDashboardOverview = async (req, res) => {
    try {
        const userId = req.userId;
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
        const sevenDaysAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));

        // Get recent symptom sessions
        const recentSessions = await SymptomSession.find({
            user: userId,
            createdAt: { $gte: thirtyDaysAgo }
        })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('symptoms analysis createdAt status');

        // Get health summary
        const totalSessions = await SymptomSession.countDocuments({ user: userId });
        const urgentSessions = await SymptomSession.countDocuments({ 
            user: userId, 
            isUrgent: true,
            createdAt: { $gte: thirtyDaysAgo }
        });

        // Get recent health tracker entries
        const recentTrackerEntries = await HealthTracker.find({
            user: userId,
            date: { $gte: sevenDaysAgo }
        })
        .sort({ date: -1 })
        .limit(7);

        // Calculate health trends
        const symptomTrends = await SymptomSession.aggregate([
            {
                $match: {
                    user: userId,
                    createdAt: { $gte: thirtyDaysAgo }
                }
            },
            {
                $group: {
                    _id: '$analysis.severity.level',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Get most common symptoms
        const commonSymptoms = await SymptomSession.aggregate([
            {
                $match: {
                    user: userId,
                    createdAt: { $gte: thirtyDaysAgo }
                }
            },
            {
                $unwind: '$symptoms.selectedSymptoms'
            },
            {
                $group: {
                    _id: '$symptoms.selectedSymptoms',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 5
            }
        ]);

        res.json({
            healthSummary: {
                totalSessions,
                urgentIssues: urgentSessions,
                lastUpdated: recentSessions[0]?.createdAt || null,
                status: urgentSessions > 0 ? 'attention_needed' : 'no_urgent_issues'
            },
            recentSessions: recentSessions.map(session => ({
                id: session._id,
                condition: session.analysis?.primaryCondition?.name || 'Analysis pending',
                severity: session.analysis?.severity?.level || 'Unknown',
                date: session.createdAt,
                status: session.status
            })),
            healthTrends: {
                symptomTrends,
                commonSymptoms: commonSymptoms.map(s => ({
                    symptom: s._id,
                    count: s.count
                }))
            },
            trackerSummary: {
                entriesThisWeek: recentTrackerEntries.length,
                lastEntry: recentTrackerEntries[0]?.date || null
            },
            notifications: {
                unreadCount: 0 // Simplified for now
            }
        });
    } catch (error) {
        console.error('Error in getDashboardOverview:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get user's health statistics
const getHealthStats = async (req, res) => {
    try {
        const userId = req.userId;
        const { period = '30' } = req.query; // days
        
        const daysAgo = new Date();
        daysAgo.setDate(daysAgo.getDate() - parseInt(period));

        // Symptom session stats
        const sessionStats = await SymptomSession.aggregate([
            {
                $match: {
                    user: userId,
                    createdAt: { $gte: daysAgo }
                }
            },
            {
                $group: {
                    _id: null,
                    totalSessions: { $sum: 1 },
                    urgentSessions: {
                        $sum: { $cond: [{ $eq: ['$isUrgent', true] }, 1, 0] }
                    },
                    averageConfidence: {
                        $avg: '$analysis.primaryCondition.confidence'
                    }
                }
            }
        ]);

        // Health tracker stats
        const trackerStats = await HealthTracker.aggregate([
            {
                $match: {
                    user: userId,
                    date: { $gte: daysAgo }
                }
            },
            {
                $group: {
                    _id: null,
                    totalEntries: { $sum: 1 },
                    averageMood: { $avg: '$mood.rating' },
                    averageEnergy: { $avg: '$energy.level' },
                    averageSymptomSeverity: { $avg: '$averageSymptomSeverity' }
                }
            }
        ]);

        res.json({
            period: `${period} days`,
            symptoms: sessionStats[0] || {
                totalSessions: 0,
                urgentSessions: 0,
                averageConfidence: 0
            },
            tracking: trackerStats[0] || {
                totalEntries: 0,
                averageMood: 0,
                averageEnergy: 0,
                averageSymptomSeverity: 0
            }
        });
    } catch (error) {
        console.error('Error in getHealthStats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getDashboardOverview,
    getHealthStats
};