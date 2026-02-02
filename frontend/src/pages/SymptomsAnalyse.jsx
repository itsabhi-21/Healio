import React from 'react';
import HeadIntro from '../components/symptoms/HeadIntro';
import SymptomForm from '../components/symptoms/SymptomForm';
import AIAssessment from '../components/symptoms/AIAssessment';

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-50">
        <HeadIntro/>
        <div className='max-w-7xl mx-auto px-6 py-10'>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <SymptomForm/>
            <AIAssessment/>
          </div>
        </div>
    </div>
  );
}