const { analyzeSymptoms } = require('../service/ai.services');
const SymptomSession = require('../../models/SymptomSession');

const getHealthInfo = async (req, res) => {
    try {
        const { symptoms } = req.body;

        if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
            return res.status(400).json({
                error: 'Please provide the symptoms.'
            });
        }

        const result = await analyzeSymptoms(symptoms);
        const session = await SymptomSession.create({
            symptoms,
            possibleConditions: result.possibleConditions,
            generalAdvice: result.generalAdvice,
            warningSigns: result.warningSigns,
            followUpQuestions: result.followUpQuestions,
            urgent: false,
            aiRawResponse: result,
        });

        res.json({
            message: 'Here is general information based on your symptoms. This is not a diagnosis.',
            data: {
                sessionId: session._id,
                symptomsAnalyzed: symptoms,
                ...result,
                disclaimer: "This is not medical advice. Please consult a qualified healthcare provider for any health concerns.",
            }
        });
    } catch (error) {
        console.error('Error in getHealthInfo:', error);
        res.status(500).json({
            error: 'An error occurred while processing your request.'
        });
    }
};

module.exports = {
    getHealthInfo
};