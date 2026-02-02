const { analyzeSymptoms } = require('../service/ai.services');
const SymptomSession = require('../../models/SymptomSession');

const analyzeUserSymptoms = async (req, res) => {
    try {
        const { symptoms, selectedSymptoms, duration, severity, location } = req.body;
        const userId = req.userId || null;

        // 🔹 Validate input
        if (!symptoms && (!selectedSymptoms || selectedSymptoms.length === 0)) {
            return res.status(400).json({
                error: 'Please provide symptoms description or select symptoms.'
            });
        }

        if (!severity) {
            return res.status(400).json({
                error: 'Please specify symptom severity.'
            });
        }

        // 🔹 Prepare symptoms for AI
        const symptomsToAnalyze = [];
        if (Array.isArray(selectedSymptoms)) {
            symptomsToAnalyze.push(...selectedSymptoms);
        }
        if (symptoms) {
            symptomsToAnalyze.push(symptoms);
        }

        // 🔹 Call AI
        const startTime = Date.now();
        const aiResult = await analyzeSymptoms(symptomsToAnalyze);
        const processingTime = Date.now() - startTime;

        // 🔹 Validate AI response
        if (!aiResult || typeof aiResult !== 'object') {
            console.error('❌ Invalid AI response:', aiResult);
            return res.status(500).json({
                error: 'AI returned an invalid response'
            });
        }

        // 🔹 Create DB session (MATCHING AI SERVICE OUTPUT)
        const session = new SymptomSession({
            user: userId,
            symptoms: {
                description: symptoms || '',
                selectedSymptoms: selectedSymptoms || [],
                duration,
                severity,
                location
            },
            analysis: {
                possibleConditions: aiResult.possibleConditions || [],
                generalAdvice: aiResult.generalAdvice || [],
                warningSigns: aiResult.warningSigns || []
            },
            sessionData: {
                ipAddress: req.ip,
                userAgent: req.get('User-Agent'),
                processingTime,
                aiModel: 'groq-llama'
            },
            aiRawResponse: aiResult,
            status: 'Completed'
        });

        await session.save();

        // 🔹 Send response to frontend
        res.json({
            message: 'Symptom analysis completed',
            sessionId: session._id,
            analysis: {
                possibleConditions: session.analysis.possibleConditions,
                generalAdvice: session.analysis.generalAdvice,
                warningSigns: session.analysis.warningSigns
            },
            disclaimer: aiResult.disclaimer
        });

    } catch (error) {
        console.error('❌ Error in analyzeUserSymptoms:', error);
        res.status(500).json({
            error: 'An error occurred while analyzing your symptoms.'
        });
    }
};

const getSymptomSession = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const userId = req.userId;

        const session = await SymptomSession.findOne({
            _id: sessionId,
            user: userId
        });

        if (!session) {
            return res.status(404).json({
                error: 'Symptom session not found'
            });
        }

        res.json({
            session: {
                id: session._id,
                symptoms: session.symptoms,
                analysis: session.analysis,
                status: session.status,
                createdAt: session.createdAt,
                feedback: session.feedback
            }
        });
    } catch (error) {
        console.error('❌ Error in getSymptomSession:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const submitFeedback = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { helpful, rating, comments } = req.body;
        const userId = req.userId;

        const session = await SymptomSession.findOne({
            _id: sessionId,
            user: userId
        });

        if (!session) {
            return res.status(404).json({
                error: 'Symptom session not found'
            });
        }

        session.feedback = {
            helpful,
            rating,
            comments,
            submittedAt: new Date()
        };

        await session.save();

        res.json({
            message: 'Feedback submitted successfully',
            feedback: session.feedback
        });
    } catch (error) {
        console.error('❌ Error in submitFeedback:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getUserSymptomHistory = async (req, res) => {
    try {
        const userId = req.userId;
        const { page = 1, limit = 10 } = req.query;

        const query = { user: userId };

        const sessions = await SymptomSession.find(query)
            .sort({ createdAt: -1 })
            .limit(Number(limit))
            .skip((page - 1) * limit)
            .select('symptoms analysis status createdAt');

        const total = await SymptomSession.countDocuments(query);

        res.json({
            sessions: sessions.map(session => ({
                id: session._id,
                symptoms: session.symptoms.selectedSymptoms,
                possibleConditions: session.analysis.possibleConditions,
                status: session.status,
                date: session.createdAt
            })),
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(total / limit),
                totalSessions: total
            }
        });
    } catch (error) {
        console.error('❌ Error in getUserSymptomHistory:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    analyzeUserSymptoms,
    getSymptomSession,
    submitFeedback,
    getUserSymptomHistory
};
