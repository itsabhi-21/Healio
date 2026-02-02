import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import symptomsService from '../services/symptoms';

export default function SymptomChecker() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [severity, setSeverity] = useState('');
  const [duration, setDuration] = useState('');
  const [location, setLocation] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const commonSymptoms = symptomsService.getCommonSymptoms();
  const severityOptions = symptomsService.getSeverityOptions();
  const durationOptions = symptomsService.getDurationOptions();

  const recentChecks = [
    { name: 'Mild Migraine', date: 'Yesterday, 4:30 PM' },
    { name: 'Seasonal Allergies', date: 'Oct 24, 2023' }
  ];

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const clearAllSymptoms = () => {
    setSelectedSymptoms([]);
  };

  const handleAnalyze = async () => {
    if (!symptoms.trim() && selectedSymptoms.length === 0) {
      setError('Please describe your symptoms or select from the common symptoms.');
      return;
    }

    if (!severity) {
      setError('Please select the severity of your symptoms.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const symptomData = {
        symptoms: symptoms.trim(),
        selectedSymptoms,
        severity,
        duration,
        location
      };

      const result = await symptomsService.analyzeSymptoms(symptomData);
      setAnalysisResult(result);
      setShowResults(true);
    } catch (err) {
      console.error('Error analyzing symptoms:', err);
      setError(err.message || 'Failed to analyze symptoms. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (showResults && analysisResult) {
    return <SymptomResults 
      userName={user?.firstName || 'User'} 
      analysisResult={analysisResult}
      onBack={() => setShowResults(false)}
    />;
  }

  return (
    <DashboardLayout 
      title="Symptom Checker"
      userName={user?.firstName || 'User'}
    >
      <div className="p-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500">
            <span>Overview</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Assessment</span>
          </nav>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">How are you feeling today?</h1>
              <p className="text-gray-600 mb-8">
                Describe your symptoms in your own words, or select from the common tags below. 
                The more detail you provide, the better we can help.
              </p>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <p className="text-red-800">{error}</p>
                  </div>
                </div>
              )}

              {/* Symptom Description */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Describe your symptoms
                </label>
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="e.g. I have a throbbing headache on the left side and feel slightly nauseous since this morning..."
                  className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Common Symptoms */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-700 mb-4">COMMON SYMPTOMS</h3>
                <div className="flex flex-wrap gap-3">
                  {commonSymptoms.map((symptom) => (
                    <button
                      key={symptom}
                      onClick={() => toggleSymptom(symptom)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedSymptoms.includes(symptom)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      + {symptom}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={clearAllSymptoms}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-4"
                >
                  Clear all
                </button>
              </div>

              {/* Severity Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How severe are your symptoms? *
                </label>
                <div className="space-y-3">
                  {severityOptions.map((option) => (
                    <label key={option.value} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="severity"
                        value={option.value}
                        checked={severity === option.value}
                        onChange={(e) => setSeverity(e.target.value)}
                        className="mt-1 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{option.value}</div>
                        <div className="text-sm text-gray-600">{option.label}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How long have you had these symptoms?
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select duration...</option>
                  {durationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Where do you feel the symptoms? (optional)
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. left side of head, chest, stomach..."
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Analyze Button */}
              <button
                onClick={handleAnalyze}
                disabled={loading || (!symptoms.trim() && selectedSymptoms.length === 0) || !severity}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Symptoms
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Private & Secure */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <h3 className="font-semibold text-gray-900">Private & Secure</h3>
              </div>
              <p className="text-sm text-gray-600">
                Your health data is encrypted and never shared with third parties without your explicit consent. 
                We follow strict HIPAA-compliant guidelines.
              </p>
            </div>

            {/* Emergency Warning */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h3 className="font-semibold text-red-900">Emergency?</h3>
              </div>
              <p className="text-sm text-red-800">
                If you are experiencing chest pain, difficulty breathing, or severe bleeding, do not use this tool. 
                Call emergency services immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Results Component
function SymptomResults({ userName, analysisResult, onBack }) {
  const analysis = analysisResult?.analysis || {};

  const possibleConditions = analysis.possibleConditions || [];
  const generalAdvice = analysis.generalAdvice || [];
  const warningSigns = analysis.warningSigns || [];

  return (
    <DashboardLayout title="Analysis Results" userName={userName}>
      <div className="p-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500">
            <button onClick={onBack} className="text-blue-600 hover:text-blue-700">
              Symptom Checker
            </button>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Report</span>
          </nav>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Disclaimer */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-800">
                {analysisResult.disclaimer}
              </p>
            </div>

            {/* Possible Conditions */}
            <div className="bg-white rounded-xl p-6 border">
              <h2 className="text-lg font-semibold mb-4">Possible Conditions</h2>
              {possibleConditions.length === 0 ? (
                <p className="text-gray-600">No possible conditions identified.</p>
              ) : (
                <ul className="list-disc pl-5 space-y-2">
                  {possibleConditions.map((condition, index) => (
                    <li key={index} className="text-gray-800">
                      {condition}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* General Advice */}
            <div className="bg-white rounded-xl p-6 border">
              <h2 className="text-lg font-semibold mb-4">General Advice</h2>
              {generalAdvice.length === 0 ? (
                <p className="text-gray-600">No general advice available.</p>
              ) : (
                <ul className="list-disc pl-5 space-y-2">
                  {generalAdvice.map((advice, index) => (
                    <li key={index} className="text-gray-800">
                      {advice}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Warning Signs */}
            {warningSigns.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-red-900 mb-4">
                  Warning Signs
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-red-800">
                  {warningSigns.map((sign, index) => (
                    <li key={index}>{sign}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="font-semibold mb-3">Next Steps</h3>
              <p className="text-sm text-gray-600">
                This information is for awareness only. If symptoms persist or worsen,
                consult a qualified healthcare professional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}