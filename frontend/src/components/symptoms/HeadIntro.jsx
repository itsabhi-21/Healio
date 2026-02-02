import React from 'react';

export default function HeadIntro() {
  return (
    <div className="bg-slate-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500 flex items-center gap-2">🩺 Symptom checker</p>
                <h1 className="mt-2 text-3xl font-bold text-gray-900">Describe how you're feeling</h1>
                <p className="mt-3 text-gray-600 max-w-2xl">
                Healio will analyze your symptoms to suggest possible conditions and next steps.
                </p>
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-2">🔒 Your data stays on this device</p>
        </div>
    </div>
  );
}